from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load model and preprocessing tools
model = joblib.load("modification_model.pkl")
mlb = joblib.load("label_binarizer.pkl")
model_columns = joblib.load("model_columns.pkl")

@app.route("/recommend", methods=["POST"])
def recommend_mods():
    data = request.json  # expects JSON like {"make": "Hyundai", "model": "Creta", "variant": "SX"}
    
    # Prepare input
    sample = pd.DataFrame([{
        "make": data["make"],
        "model": data["model"],
        "variant": data["variant"]
    }])
    sample_encoded = pd.get_dummies(sample).reindex(columns=model_columns, fill_value=0)

    # Predict
    prediction = model.predict(sample_encoded)
    mods = mlb.inverse_transform(prediction)

    return jsonify({
        "modifications": mods[0]
    })

if __name__ == "__main__":
    app.run(debug=True)
