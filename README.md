# ML Prediction System

This is a full-stack machine learning application using **Flask** for the backend and **React (Vite)** for the frontend.

## Project Structure

```text
ML_project/
├── backend/
│   ├── models/
│   │   └── trained_model.pkl    # Trained ML model
│   ├── routes/
│   │   ├── __init__.py
│   │   └── prediction_routes.py # API endpoints (POST /predict, GET /health)
│   ├── services/
│   │   ├── __init__.py
│   │   └── prediction_service.py# Model loading and inference logic
│   ├── requirements.txt         # Python dependencies
│   └── app.py                   # Main Flask entry point
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Page components
│   │   ├── services/            # API communication (Axios)
│   │   ├── App.jsx
│   │   ├── index.css            # Styles (Premium UI)
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── cardio_train.csv             # Raw data source
└── train_model.py               # Script to train/generate the model
```

## Setup and Running

### 1. Backend Setup
1. Open a terminal in the `backend/` directory.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the Flask server:
   ```bash
   python app.py
   ```
   The backend will start at `http://localhost:5000`.

### 2. Frontend Setup
1. Open a terminal in the `frontend/` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the React app:
   ```bash
   npm run dev
   ```
   The frontend will start at `http://localhost:3000`.

## Features
- **Modern UI**: Dark mode with glassmorphism and smooth gradients.
- **Real-time Prediction**: Features are sent to the Flask API which uses a Scikit-learn model.
- **Flexible Data**: Preprocesses data using Pandas before feeding it into the model.
- **Detailed Insights**: Returns prediction result along with confidence levels.
