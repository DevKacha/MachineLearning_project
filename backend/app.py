from flask import Flask, send_from_directory, jsonify, request
from flask_cors import CORS
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
FRONTEND_DIST = os.path.abspath(os.path.join(BASE_DIR, "..", "frontend", "dist"))

app = Flask(__name__, static_folder=FRONTEND_DIST, static_url_path="")
CORS(app)

# Serve static files if they exist
@app.route("/<path:path>")
def serve_static(path):
    file_path = os.path.join(FRONTEND_DIST, path)
    if os.path.exists(file_path):
        return send_from_directory(FRONTEND_DIST, path)
    return send_from_directory(FRONTEND_DIST, "index.html")

# Root
@app.route("/")
def index():
    return send_from_directory(FRONTEND_DIST, "index.html")

# Health
@app.route("/health")
def health():
    return jsonify({"status": "Backend running"})

# ML API
@app.route("/predict", methods=["POST"])
def predict():
    return jsonify({"prediction": "sample"})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)