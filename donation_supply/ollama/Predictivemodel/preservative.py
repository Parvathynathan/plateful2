import pandas as pd
import xgboost as xgb
import lightgbm as lgb
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import mean_absolute_error
from sklearn.preprocessing import LabelEncoder

# 🚀 Load the dataset
df = pd.read_csv("food_freshness_data.csv")  # Ensure you have a CSV with additional features
if "storage_conditions" not in df.columns:
    df["storage_conditions"] = "Unknown"

if "packaging_type" not in df.columns:
    df["packaging_type"] = "Standard"
# 🎯 Feature Engineering: Convert categorical features to numerical values
categorical_features = ["food_type", "storage_conditions", "packaging_type"]
for col in categorical_features:
    df[col] = LabelEncoder().fit_transform(df[col])

# 🎯 Define Features & Target
X = df.drop(columns=["expiry_days"])  # Features
y = df["expiry_days"]  # Target variable

# 🎯 Split data into training & testing (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 🚀 **Hyperparameter tuning using GridSearchCV**
param_grid = {
    "n_estimators": [100, 200, 300],
    "max_depth": [3, 5, 7],
    "learning_rate": [0.01, 0.1, 0.2],
    "subsample": [0.8, 1.0],
}

xgb_model = xgb.XGBRegressor(objective="reg:squarederror")
grid_search = GridSearchCV(xgb_model, param_grid, cv=3, scoring="neg_mean_absolute_error", verbose=1, n_jobs=-1)
grid_search.fit(X_train, y_train)

# 🎯 Best model from GridSearch
best_xgb_model = grid_search.best_estimator_

# 🚀 **Ensemble Learning: Combine XGBoost, RandomForest, and LightGBM**
rf_model = RandomForestRegressor(n_estimators=200, random_state=42)
lgb_model = lgb.LGBMRegressor(n_estimators=200, learning_rate=0.1, random_state=42)

# Train all models
rf_model.fit(X_train, y_train)
lgb_model.fit(X_train, y_train)

# Predict using all models
xgb_pred = best_xgb_model.predict(X_test)
rf_pred = rf_model.predict(X_test)
lgb_pred = lgb_model.predict(X_test)

# 🎯 Ensemble Averaging
final_pred = (xgb_pred + rf_pred + lgb_pred) / 3

# 🎯 Evaluate Performance
mae = mean_absolute_error(y_test, final_pred)
print(f"📊 Final Mean Absolute Error: {mae:.2f}")

# 🚀 **Example Prediction**
example = pd.DataFrame([[0, 4, 70, 0, 5, 1, 2]], 
                       columns=["food_type", "temperature", "humidity", "is_opened", "days_since_manufacture", "storage_conditions", "packaging_type"])
example_pred = (best_xgb_model.predict(example) + rf_model.predict(example) + lgb_model.predict(example)) / 3
print(f"🔥 Predicted Expiry Days: {example_pred[0]:.2f}")
