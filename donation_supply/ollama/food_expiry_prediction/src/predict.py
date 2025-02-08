import pandas as pd
import joblib
import os

# Load trained model
model_path = os.path.join("models", "xgboost_model.pkl")

if not os.path.exists(model_path):
    raise FileNotFoundError(f"❌ Model file not found at {model_path}! Train the model first.")
xgb_model = joblib.load(model_path)
print(f"✅ Model loaded from {model_path}")

# Function for prediction
def predict_freshness(food_type, temperature, humidity, is_opened, days_since_manufacture):
    """Predict expiry days for a given food item."""
    
    # Encoding food type (same mapping as training)
    food_mapping = {
        "Milk": 0, "Rice": 1, "Apple": 2, "Chicken": 3, "Eggs": 4,
        "Carrots": 5, "Cheese": 6, "Fish": 7, "Bread": 8, "Tomato": 9
    }
    
    # Validate input
    if food_type not in food_mapping:
        raise ValueError(f"❌ Unknown food type '{food_type}'! Allowed values: {list(food_mapping.keys())}")

    if not isinstance(temperature, (int, float)) or not isinstance(humidity, (int, float)):
        raise ValueError("❌ Temperature and humidity must be numeric!")

    if not isinstance(is_opened, int) or is_opened not in [0, 1]:
        raise ValueError("❌ 'is_opened' must be 0 (closed) or 1 (opened)!")

    if not isinstance(days_since_manufacture, (int, float)) or days_since_manufacture < 0:
        raise ValueError("❌ 'days_since_manufacture' must be a positive number!")

    # Encode food type
    food_type_encoded = food_mapping[food_type]

    # Create input DataFrame
    input_data = pd.DataFrame([[food_type_encoded, temperature, humidity, is_opened, days_since_manufacture]], 
                              columns=["food_type", "temperature", "humidity", "is_opened", "days_since_manufacture"])

    # Predict
    predicted_expiry = xgb_model.predict(input_data)[0]

    # Ensure it's a standard Python float (not numpy float32)
    return float(predicted_expiry)

# Example prediction
try:
    example_prediction = predict_freshness("Milk", 4, 70, 0, 5)
    print(f"🔥 Predicted Expiry Days: {example_prediction}")
except Exception as e:
    print(f"⚠️ Error: {e}")
