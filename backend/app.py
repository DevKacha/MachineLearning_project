from flask import Flask
from flask_cors import CORS
from routes.prediction_routes import prediction_bp
import os

def create_app():
    """Factory function to create the Flask app."""
    app = Flask(__name__)
    
    # Enable Cross-Origin Resource Sharing (CORS) for all routes
    # This allows our React frontend to communicate with this backend
    CORS(app)

    # Register the prediction blueprint
    app.register_blueprint(prediction_bp)

    return app

if __name__ == "__main__":
    # Create the app instance
    app = create_app()
    
    # Print welcome message
    print("---------------------------------------")
    print("   Machine Learning Backend Starting   ")
    print("   URL: http://127.0.0.1:5000         ")
    print("---------------------------------------")
    
    # Run the app
    # host='0.0.0.0' makes it accessible on the local network
    # debug=True enables auto-reloading when code changes
    app.run(host='0.0.0.0', port=5000, debug=True)
