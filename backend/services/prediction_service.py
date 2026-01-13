import pickle
import pandas as pd
import os

class PredictionService:
    def __init__(self, model_path):
        self.model_path = model_path
        self.model = None
        self._load_model()

    def _load_model(self):
        """Load the trained ML model from the specified path."""
        if os.path.exists(self.model_path):
            with open(self.model_path, 'rb') as f:
                self.model = pickle.load(f)
            print(f"Model loaded successfully from {self.model_path}")
        else:
            print(f"Error: Model file not found at {self.model_path}")

    def predict(self, data):
        """
        Accepts a dictionary of features, converts to DataFrame, 
        and returns the model's prediction.
        """
        if self.model is None:
            return {"error": "Model not loaded"}

        try:
            # Convert input dictionary to DataFrame for the model
            df = pd.DataFrame([data])
            
            # Ensure the order of columns matches what the model was trained on
            feature_order = ['age', 'gender', 'height', 'weight', 'ap_hi', 'ap_lo', 'cholesterol', 'gluc', 'smoke', 'alco', 'active']
            df = df[feature_order]

            # Convert all columns to numeric (crucial if frontend sends strings)
            df = df.apply(pd.to_numeric)

            # Get prediction (0 or 1)
            prediction = self.model.predict(df)[0]
            
            # Get probability
            probabilities = self.model.predict_proba(df)[0]
            probability = float(probabilities[1]) # Probability of risk (class 1)

            # Format result for "Dev Kacha" frontend
            has_disease = bool(prediction == 1)
            return {
                "prediction": "Disease Detected" if has_disease else "No Disease Detected",
                "probability": round(probability * 100, 1),
                "hasDisease": has_disease,
                "confidence": float(max(probabilities)),
                "status": "success"
            }
        except Exception as e:
            return {"error": str(e), "status": "failed"}

# Initialize a global instance of the service
# The path is relative to the backend/app.py execution
model_path = os.path.join(os.path.dirname(__file__), '..', 'models', 'trained_model.pkl')
prediction_service = PredictionService(model_path)
