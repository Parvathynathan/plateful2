import pandas as pd
from sklearn.linear_model import LinearRegression
import pickle
from db import get_shortage_data

# Load data from MongoDB
data = get_shortage_data()
df = pd.DataFrame(data)

if df.empty:
    print("No data found in MongoDB.")
    exit()

# Convert categorical data into numerical (e.g., foodType -> integer labels)
df["foodType"] = df["foodType"].astype("category").cat.codes
df["location"] = df["location"].astype("category").cat.codes

X = df[["foodType", "location"]]  # Features
y = df["shortageCount"]  # Target (Shortage)
# Train Model
model = LinearRegression()
model.fit(X, y)

# Save Model
with open("shortage_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Model trained and saved.")
