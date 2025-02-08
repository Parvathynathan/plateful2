import pickle
import numpy as np
from db import shortages_collection

# Load trained model
with open("shortage_model.pkl", "rb") as f:
    model = pickle.load(f)

def predict_shortage(foodType, location):
    # Convert foodType & location to categorical values
    food_map = {doc["foodType"]: idx for idx, doc in enumerate(shortages_collection.find({}, {"foodType": 1}))}
    loc_map = {doc["location"]: idx for idx, doc in enumerate(shortages_collection.find({}, {"location": 1}))}
    print(food_map,loc_map)
    if foodType not in food_map or location not in loc_map:
    
        return {"error": "Invalid foodType or location"}

    X_test = np.array([[food_map[foodType], loc_map[location]]])
    predicted_shortage = model.predict(X_test)[0]

    return {"predicted_shortage": round(predicted_shortage)}

if __name__ == "__main__":
    print(predict_shortage("Rice", "New York, NY"))
