from flask import Flask, send_from_directory
from flask_cors import CORS
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
FRONTEND_DIST = os.path.join(BASE_DIR, "../frontend/dist")

app = Flask(__name__, static_folder=FRONTEND_DIST, static_url_path="")
CORS(app)

@app.route("/")
def serve_frontend():
    return send_from_directory(FRONTEND_DIST, "index.html")

@app.route("/health")
def health():
    return {"status": "Backend running"}

# example ML route
@app.route("/predict", methods=["POST"])
def predict():
    return {"prediction": "sample"}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
