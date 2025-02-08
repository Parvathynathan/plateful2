import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import joblib
import os

# Load preprocessed data
data_path = os.path.join("data", "processed", "cleaned_data.csv")
df = pd.read_csv(data_path)

# 🔍 Debug Check 1: Ensure Data is Loaded Correctly
print("🔹 First 5 rows of the dataset:")
print(df.head())

# Splitting features & target
if "expiry_days" not in df.columns:
    raise ValueError("❌ 'expiry_days' column not found in the dataset!")

X = df.drop(columns=["expiry_days"])
y = df["expiry_days"]

# 🔍 Debug Check 2: Target Column Statistics
print("\n🔹 Target (expiry_days) Summary:")
print(y.describe())

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# 🔍 Debug Check 3: Feature Consistency
print("\n🔹 Training Features:", X_train.columns.tolist())
print("🔹 Testing Features:", X_test.columns.tolist())

# Initialize XGBoost model
xgb_model = xgb.XGBRegressor(n_estimators=100, learning_rate=0.1, max_depth=3, random_state=42)

# Train model
xgb_model.fit(X_train, y_train)

# Predictions
y_pred = xgb_model.predict(X_test)

# 🔍 Debug Check 4: Unique Predictions
print("\n🔹 Unique Predictions:", pd.Series(y_pred).nunique())
print("🔹 Sample Predictions:", y_pred[:10])

# Model evaluation
mae = mean_absolute_error(y_test, y_pred)
print(f"\n📊 Mean Absolute Error: {mae:.2f}")

# 🔍 Debug Check 5: Train vs Test MAE (Check Overfitting)
train_pred = xgb_model.predict(X_train)
train_mae = mean_absolute_error(y_train, train_pred)
print(f"\n🔹 Train MAE: {train_mae:.2f}, Test MAE: {mae:.2f}")

# Save model
model_dir = "models"
os.makedirs(model_dir, exist_ok=True)  # Ensure directory exists
model_path = os.path.join(model_dir, "xgboost_model.pkl")
joblib.dump(xgb_model, model_path)
print(f"\n✅ Model saved at {model_path}")

print(y_test.values[:10])  # True expiry days  
print(y_pred[:10])   