# 🚗 Car Modification Recommender

This is an integrated system that combines:
1. **Image Classification Model**: Predicts car make/model from uploaded images
2. **Modification Recommendation System**: Suggests car modifications based on the predicted make/model

## 🏗️ Architecture

```
User Uploads Image → Image Classification → Extract Make/Model → Modification Recommendations
```

## 📁 File Structure

```
├── integrated_app.py          # Main Flask application
├── templates/
│   └── index.html            # Web interface
├── backend/
│   ├── main.py               # Original modification recommendation API
│   ├── modification_model.pkl # Trained modification model
│   ├── label_binarizer.pkl   # Label binarizer for modifications
│   └── model_columns.pkl     # Model columns for encoding
├── car_make_model_classifier.h5 # Trained image classification model
├── Cars/                     # Training data for image classification
└── requirements.txt          # Python dependencies
```

## 🚀 Setup & Installation

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Ensure Model Files Exist**:
   - `car_make_model_classifier.h5` (from ImageClassification.ipynb)
   - `backend/modification_model.pkl`
   - `backend/label_binarizer.pkl`
   - `backend/model_columns.pkl`

3. **Run the Application**:
   ```bash
   python integrated_app.py
   ```

4. **Access the Web Interface**:
   - Open your browser and go to `http://localhost:5000`

## 🔧 How It Works

### 1. Image Classification
- Uses a MobileNetV2-based model trained on car images
- Predicts car make, model, and variant from uploaded images
- Returns confidence score for the prediction

### 2. Modification Recommendations
- Takes the predicted make/model/variant
- Uses a trained machine learning model to recommend modifications
- Returns a list of suggested car modifications

### 3. API Endpoints

- `GET /` - Web interface for uploading images
- `POST /predict` - API endpoint for image analysis
- `GET /health` - Health check endpoint

## 📊 API Usage

### Upload Image and Get Recommendations

**Endpoint**: `POST /predict`

**Request**: Multipart form data with image file

**Response**:
```json
{
  "car_prediction": {
    "full_label": "BMW,3 Series,GT,",
    "make": "BMW",
    "model": "3 Series",
    "variant": "GT",
    "confidence": 0.85
  },
  "modifications": [
    "Performance Exhaust",
    "Sport Suspension",
    "Custom Wheels"
  ]
}
```

## 🎯 Example Usage

1. **Web Interface**: Upload an image through the web interface at `http://localhost:5000`

2. **API Call**: Use curl or any HTTP client:
   ```bash
   curl -X POST -F "image=@car_image.jpg" http://localhost:5000/predict
   ```

## 🔍 Troubleshooting

### Common Issues:

1. **Model Files Missing**:
   - Ensure all `.pkl` files are in the `backend/` directory
   - Ensure `car_make_model_classifier.h5` exists in the root directory

2. **Memory Issues**:
   - The image classification model requires significant memory
   - Consider using a machine with at least 4GB RAM

3. **Import Errors**:
   - Make sure all dependencies are installed: `pip install -r requirements.txt`
   - Check Python version compatibility (Python 3.8+ recommended)

4. **Image Format Issues**:
   - Supported formats: PNG, JPG, JPEG, GIF, BMP, TIFF, WEBP
   - Ensure images are clear and show the car prominently

## 🛠️ Customization

### Adding New Car Models:
1. Retrain the image classification model with new data
2. Update the `class_labels` list in `integrated_app.py`
3. Ensure the modification model supports the new make/model combinations

### Modifying the Web Interface:
- Edit `templates/index.html` for UI changes
- The interface uses vanilla JavaScript and CSS

## 📈 Performance Notes

- **Image Classification**: ~1-3 seconds per image
- **Modification Recommendations**: ~0.1 seconds
- **Total Response Time**: ~1-4 seconds depending on image size and server specs

## 🔒 Security Considerations

- File uploads are validated for allowed extensions
- Uploaded files are automatically cleaned up after processing
- Consider adding authentication for production use
- Implement rate limiting for API endpoints

## 📝 License

This project is for educational and demonstration purposes.
.\venv\Scripts\activate
