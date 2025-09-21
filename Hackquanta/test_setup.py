#!/usr/bin/env python3
"""
Test script to verify your setup before running the main application
"""

import sys
import os

def test_imports():
    """Test if all required packages can be imported"""
    print("🔍 Testing package imports...")
    
    packages = [
        ('flask', 'Flask web framework'),
        ('pandas', 'Data manipulation'),
        ('numpy', 'Numerical computing'),
        ('joblib', 'Model loading'),
        ('sklearn', 'Machine learning utilities')
    ]
    
    failed_imports = []
    
    for package, description in packages:
        try:
            __import__(package)
            print(f"✅ {package} - {description}")
        except ImportError as e:
            print(f"❌ {package} - {description} - Error: {e}")
            failed_imports.append(package)
    
    # Test TensorFlow separately
    try:
        import tensorflow as tf
        print(f"✅ tensorflow - Deep learning framework (version: {tf.__version__})")
    except ImportError as e:
        print(f"⚠️ tensorflow - Deep learning framework - Error: {e}")
        print("   This is optional - the app will work in manual mode without TensorFlow")
        failed_imports.append('tensorflow')
    
    return failed_imports

def test_model_files():
    """Test if model files exist"""
    print("\n📁 Testing model files...")
    
    model_files = [
        ('backend/modification_model.pkl', 'Modification recommendation model'),
        ('backend/label_binarizer.pkl', 'Label binarizer for modifications'),
        ('backend/model_columns.pkl', 'Model columns for encoding'),
        ('car_make_model_classifier.h5', 'Image classification model')
    ]
    
    missing_files = []
    
    for filepath, description in model_files:
        if os.path.exists(filepath):
            print(f"✅ {filepath} - {description}")
        else:
            print(f"❌ {filepath} - {description} - File not found")
            missing_files.append(filepath)
    
    return missing_files

def test_backend_api():
    """Test if the backend API works"""
    print("\n🔧 Testing backend API...")
    
    try:
        import joblib
        import pandas as pd
        
        # Try to load the models
        modification_model = joblib.load("backend/modification_model.pkl")
        mlb = joblib.load("backend/label_binarizer.pkl")
        model_columns = joblib.load("backend/model_columns.pkl")
        
        print("✅ Successfully loaded modification models")
        
        # Test a simple prediction
        sample = pd.DataFrame([{
            "make": "BMW",
            "model": "3 Series",
            "variant": "GT"
        }])
        
        sample_encoded = pd.get_dummies(sample).reindex(columns=model_columns, fill_value=0)
        prediction = modification_model.predict(sample_encoded)
        mods = mlb.inverse_transform(prediction)
        
        print(f"✅ Test prediction successful - Modifications: {mods[0]}")
        return True
        
    except Exception as e:
        print(f"❌ Backend API test failed: {e}")
        return False

def main():
    print("🚗 Car Modification Recommender - Setup Test")
    print("=" * 50)
    
    # Test imports
    failed_imports = test_imports()
    
    # Test model files
    missing_files = test_model_files()
    
    # Test backend API
    backend_works = test_backend_api()
    
    # Summary
    print("\n📊 Test Summary:")
    print("=" * 50)
    
    if not failed_imports or (len(failed_imports) == 1 and 'tensorflow' in failed_imports):
        print("✅ Package imports: OK")
    else:
        print(f"❌ Package imports: {len(failed_imports)} failed")
        print("   Run: pip install -r requirements.txt")
    
    if not missing_files:
        print("✅ Model files: All present")
    else:
        print(f"❌ Model files: {len(missing_files)} missing")
        print("   Make sure all model files are in the correct locations")
    
    if backend_works:
        print("✅ Backend API: Working")
    else:
        print("❌ Backend API: Failed")
    
    # Recommendations
    print("\n💡 Recommendations:")
    print("=" * 50)
    
    if 'tensorflow' in failed_imports:
        print("• TensorFlow installation failed. You can still use the app in manual mode.")
        print("• Try: pip install tensorflow")
        print("• Or use the alternative app: python integrated_app_alternative.py")
    
    if missing_files:
        print("• Missing model files. Please ensure all .pkl and .h5 files are present.")
    
    if backend_works and (not failed_imports or (len(failed_imports) == 1 and 'tensorflow' in failed_imports)):
        print("✅ You can run the application!")
        print("• Full mode: python integrated_app.py")
        print("• Manual mode: python integrated_app_alternative.py")
    else:
        print("❌ Some issues need to be resolved before running the application.")

if __name__ == "__main__":
    main()
