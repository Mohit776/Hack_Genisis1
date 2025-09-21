from flask import Flask, request, jsonify, render_template
import joblib
import pandas as pd
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS

app = Flask(__name__)

# ✅ Allow only your frontend (Vite React at localhost:5173)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp', 'tiff', 'webp'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Create uploads directory if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load models
image_model = load_model("car_make_model_classifier.h5")
modification_model = joblib.load("backend/modification_model.pkl")
mlb = joblib.load("backend/label_binarizer.pkl")
model_columns = joblib.load("backend/model_columns.pkl")

# Class labels
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
    try:
        img = image.load_img(img_path, target_size=(224, 224))
        img_array = image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        prediction = image_model.predict(img_array)
        class_id = np.argmax(prediction)
        confidence = np.max(prediction)

        predicted_label = class_labels[class_id]
        return predicted_label, confidence
    except Exception:
        return None, 0.0

def parse_car_label(label):
    """Parse the predicted label to extract make, model, and variant"""
    if ',' in label:
        parts = [part.strip() for part in label.split(',')]
        if len(parts) >= 3:
            return parts[0], parts[1], parts[2]
        elif len(parts) == 2:
            return parts[0], parts[1], "Standard"
        else:
            return parts[0], "Unknown", "Standard"
    else:
        words = label.split()
        if len(words) >= 3:
            return words[0], " ".join(words[1:-1]), words[-1]
        elif len(words) == 2:
            return words[0], words[1], "Standard"
        else:
            return words[0] if words else "Unknown", "Unknown", "Standard"

def get_modifications(make, model, variant):
    """Get modification recommendations for the car"""
    try:
        sample = pd.DataFrame([{
            "make": make,
            "model": model,
            "variant": variant
        }])
        sample_encoded = pd.get_dummies(sample).reindex(columns=model_columns, fill_value=0)
        prediction = modification_model.predict(sample_encoded)
        mods = mlb.inverse_transform(prediction)
        return mods[0] if mods[0] else ["No specific modifications found for this car"]
    except Exception as e:
        return [f"Error getting modifications: {str(e)}"]

@app.route("/predict", methods=["POST"])
def predict_and_recommend():
    """Accept image and return car prediction + modifications"""
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No image file selected"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        try:
            predicted_label, confidence = predict_car_from_image(filepath)
            if predicted_label is None:
                return jsonify({"error": "Failed to predict car from image"}), 500

            make, model, variant = parse_car_label(predicted_label)
            modifications = get_modifications(make, model, variant)

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
            if os.path.exists(filepath):
                os.remove(filepath)
            return jsonify({"error": f"Processing error: {str(e)}"}), 500

    return jsonify({"error": "Invalid file type"}), 400

'''@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")'''

@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "healthy",
        "message": "Integrated car classification and modification system is running"
    })

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
