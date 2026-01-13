from flask import Blueprint, request, jsonify
from services.prediction_service import prediction_service

# Create a Blueprint for our routes
prediction_bp = Blueprint('prediction', __name__)

@prediction_bp.route('/health', methods=['GET'])
def health_check():
    """Endpoint to check if the server is running."""
    return jsonify({
        "status": "healthy",
        "message": "Flask ML server is running"
    }), 200

@prediction_bp.route('/predict', methods=['POST'])
def predict():
    """
    Endpoint to receive feature data and return ML prediction.
    Expected JSON input format:
    {
        "age": 18393,
        "gender": 1,
        "height": 168,
        "weight": 62,
        ...
    }
    """
    # Get JSON data from request
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "No input data provided"}), 400

    # Call the prediction service
    result = prediction_service.predict(data)
    
    if "error" in result:
        return jsonify(result), 500
        
    return jsonify(result), 200

@prediction_bp.route('/api/stats', methods=['GET'])
def get_stats():
    """Endpoint to provide basic stats from the dataset."""
    try:
        import pandas as pd
        import os
        csv_path = os.path.join(os.path.dirname(__file__), '..', '..', 'cardio_train.csv')
        df = pd.read_csv(csv_path, sep=';')
        total_patients = len(df)
        return jsonify({
            "total_patients": total_patients,
            "status": "success"
        }), 200
    except Exception as e:
        return jsonify({
            "total_patients": 70000, # Fallback
            "error": str(e)
        }), 200
