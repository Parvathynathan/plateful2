from flask import Flask, request, jsonify
import joblib
import pandas as pd
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests (for frontend)

# Load trained model
model_path = os.path.join("models", "xgboost_model.pkl")

# Check if the model exists
if not os.path.exists(model_path):
    raise FileNotFoundError(f"❌ Model file not found at {model_path}! Train the model first.")

# Load model
model = joblib.load(model_path)

# Food type encoding (same as used in training)
FOOD_MAPPING = {
    "Milk": 0, "Rice": 1, "Apple": 2, "Chicken": 3, "Eggs": 4,
    "Carrots": 5, "Cheese": 6, "Fish": 7, "Bread": 8, "Tomato": 9
}

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get JSON data from request
        data = request.get_json()

        # Extract required fields
        food_type = data.get("food_type")
        temperature = data.get("temperature")
        humidity = data.get("humidity")
        is_opened = data.get("is_opened")
        days_since_manufacture = data.get("days_since_manufacture")

        # Validate input
        if food_type not in FOOD_MAPPING:
            return jsonify({"error": "Invalid food type"}), 400
        if not isinstance(temperature, (int, float)) or not isinstance(humidity, (int, float)):
            return jsonify({"error": "Temperature and humidity must be numeric"}), 400
        if not isinstance(is_opened, int) or is_opened not in [0, 1]:
            return jsonify({"error": "'is_opened' must be 0 (closed) or 1 (opened)"}), 400
        if not isinstance(days_since_manufacture, (int, float)) or days_since_manufacture < 0:
            return jsonify({"error": "'days_since_manufacture' must be a positive number"}), 400

        # Encode food type
        food_type_encoded = FOOD_MAPPING[food_type]

        # Create input DataFrame
        input_data = pd.DataFrame([[food_type_encoded, temperature, humidity, is_opened, days_since_manufacture]],
                                  columns=["food_type", "temperature", "humidity", "is_opened", "days_since_manufacture"])

        # Make prediction
        predicted_expiry = model.predict(input_data)[0]

        # Ensure output is a standard Python float for JSON serialization
        return jsonify({"predicted_expiry_days": round(float(predicted_expiry), 2)})

    except Exception as e:
        return jsonify({"error": "Failed to get prediction", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5001)  # Running on port 5001
