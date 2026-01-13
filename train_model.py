import pandas as pd
import pickle
from sklearn.ensemble import RandomForestClassifier
import os

# Create folders if they don't exist
os.makedirs('backend/models', exist_ok=True)

def train_dummy_model():
    # Load the CSV data to see its structure
    df = pd.read_csv('cardio_train.csv', sep=';')
    
    # Simple training (just for demonstration)
    # Target is 'cardio', features are the rest except 'id'
    X = df.drop(['id', 'cardio'], axis=1)
    y = df['cardio']
    
    # Train a simple model
    model = RandomForestClassifier(n_estimators=10)
    model.fit(X, y)
    
    # Save the model
    with open('backend/models/trained_model.pkl', 'wb') as f:
        pickle.dump(model, f)
    
    print("Dummy model trained and saved to backend/models/trained_model.pkl")

if __name__ == "__main__":
    train_dummy_model()
