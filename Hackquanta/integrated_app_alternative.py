from flask import Flask, request, jsonify, render_template
import joblib
import pandas as pd
import numpy as np
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp', 'tiff', 'webp'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Create uploads directory if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load modification recommendation model and preprocessing tools
try:
    modification_model = joblib.load("backend/modification_model.pkl")
    mlb = joblib.load("backend/label_binarizer.pkl")
    model_columns = joblib.load("backend/model_columns.pkl")
    print("✅ Successfully loaded modification models")
except Exception as e:
    print(f"❌ Error loading modification models: {e}")
    modification_model = None
    mlb = None
    model_columns = None

# Try to load the image classification model
image_model = None
try:
    from tensorflow.keras.models import load_model
    from tensorflow.keras.preprocessing import image
    image_model = load_model("car_make_model_classifier.h5")
    print("✅ Successfully loaded image classification model")
except Exception as e:
    print(f"⚠️ Warning: Could not load image classification model: {e}")
    print("The app will work in manual mode - you'll need to provide make/model manually")

# Get class labels for image classification
class_labels = [
    "BMW 5 Series M Sport",
    "BMW,3 Series,GT,",
    "BMW,7 Series,740Li",
    "Ford,EcoSport,Titanium+,",
    "Ford,Fiesta,Titanium",
    "Honda,City,ZX",
    "Honda,WR-V,VX,",
    "Hyundai creta",
    "Jeep,Compass,Limited",
    "Jeep,Compass,Sport,",
    "Kia,Seltos,GTX+",
    "Mahindra XUV 700",
    "Maruti Swift",
    "Mercedes,C-Class,AMG",
    "Mercedes,GLE,Exclusive,",
    "MG Astor",
    "MG,Hector,Sharp,",
    "MG,ZS EV,",
    "Renault,Duster,RXZ,",
    "Renult kiger , RXT",
    "Renult, Kiger zx",
    "Skoda,Octavia,L&K,",
    "Skoda,Virtus,Style",
    "Tata Nexon",
    "Toyota,Fortuner,Legender,",
    "Toyota,Innova Crysta,ZX,",
    "Volkswagen,Slavia,",
    "Volkswagen,Taigun,GT Line,"
]

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def predict_car_from_image(img_path):
    """Predict car make/model from image"""
    if image_model is None:
        return None, 0.0
    
    try:
        # Load and preprocess image
        img = image.load_img(img_path, target_size=(224, 224))
        img_array = image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        
        # Predict
        prediction = image_model.predict(img_array)
        class_id = np.argmax(prediction)
        confidence = np.max(prediction)
        
        predicted_label = class_labels[class_id]
        
        return predicted_label, confidence
    except Exception as e:
        print(f"Error in image prediction: {e}")
        return None, 0.0

def parse_car_label(label):
    """Parse the predicted label to extract make, model, and variant"""
    # Handle different label formats
    if ',' in label:
        parts = [part.strip() for part in label.split(',')]
        if len(parts) >= 3:
            make = parts[0]
            model = parts[1]
            variant = parts[2]
        elif len(parts) == 2:
            make = parts[0]
            model = parts[1]
            variant = "Standard"
        else:
            make = parts[0]
            model = "Unknown"
            variant = "Standard"
    else:
        # Handle labels without commas (like "BMW 5 Series M Sport")
        words = label.split()
        if len(words) >= 3:
            make = words[0]
            model = " ".join(words[1:-1])
            variant = words[-1]
        elif len(words) == 2:
            make = words[0]
            model = words[1]
            variant = "Standard"
        else:
            make = words[0] if words else "Unknown"
            model = "Unknown"
            variant = "Standard"
    
    return make, model, variant

def get_modifications(make, model, variant):
    """Get modification recommendations for the car"""
    if modification_model is None or mlb is None or model_columns is None:
        return ["Modification model not available. Please check if model files are present."]
    
    try:
        # Prepare input for modification model
        sample = pd.DataFrame([{
            "make": make,
            "model": model,
            "variant": variant
        }])
        
        # Encode the input
        sample_encoded = pd.get_dummies(sample).reindex(columns=model_columns, fill_value=0)
        
        # Predict modifications
        prediction = modification_model.predict(sample_encoded)
        mods = mlb.inverse_transform(prediction)
        
        return mods[0] if mods[0] else ["No specific modifications found for this car"]
    except Exception as e:
        return [f"Error getting modifications: {str(e)}"]

@app.route("/predict", methods=["POST"])
def predict_and_recommend():
    """Main endpoint that accepts an image and returns car prediction + modifications"""
    
    # Check if image file is present
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No image file selected"}), 400
    
    if file and allowed_file(file.filename):
        # Save uploaded file
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        try:
            # Predict car from image
            predicted_label, confidence = predict_car_from_image(filepath)
            
            if predicted_label is None:
                return jsonify({
                    "error": "Image classification model not available. Please provide make/model manually.",
                    "manual_mode": True
                }), 500
            
            # Parse the predicted label
            make, model, variant = parse_car_label(predicted_label)
            
            # Get modification recommendations
            modifications = get_modifications(make, model, variant)
            
            # Clean up uploaded file
            os.remove(filepath)
            
            return jsonify({
                "car_prediction": {
                    "full_label": predicted_label,
                    "make": make,
                    "model": model,
                    "variant": variant,
                    "confidence": float(confidence)
                },
                "modifications": modifications
            })
            
        except Exception as e:
            # Clean up uploaded file in case of error
            if os.path.exists(filepath):
                os.remove(filepath)
            return jsonify({"error": f"Processing error: {str(e)}"}), 500
    
    return jsonify({"error": "Invalid file type"}), 400

@app.route("/recommend", methods=["POST"])
def recommend_manual():
    """Manual endpoint for providing make/model directly"""
    data = request.json
    
    if not data or 'make' not in data or 'model' not in data:
        return jsonify({"error": "Please provide 'make' and 'model' in JSON format"}), 400
    
    make = data['make']
    model = data['model']
    variant = data.get('variant', 'Standard')
    
    modifications = get_modifications(make, model, variant)
    
    return jsonify({
        "car_info": {
            "make": make,
            "model": model,
            "variant": variant
        },
        "modifications": modifications
    })

@app.route("/", methods=["GET"])
def index():
    """Serve the main page"""
    return render_template("index.html")

@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint"""
    status = {
        "status": "healthy",
        "message": "Integrated car classification and modification system is running",
        "image_model_loaded": image_model is not None,
        "modification_model_loaded": modification_model is not None
    }
    return jsonify(status)

if __name__ == "__main__":
    print("🚗 Starting Car Modification Recommender...")
    print(f"📁 Upload folder: {UPLOAD_FOLDER}")
    print(f"🔧 Modification model loaded: {modification_model is not None}")
    print(f"🖼️ Image model loaded: {image_model is not None}")
    
    if image_model is None:
        print("⚠️ Image classification model not loaded. The app will work in manual mode.")
        print("   You can still test modification recommendations by providing make/model manually.")
    
    app.run(debug=True, host="0.0.0.0", port=5000)
