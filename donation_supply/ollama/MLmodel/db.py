from pymongo import MongoClient
import os

# MongoDB Connection
MONGO_URI = "mongodb://localhost:27017"  # Update if using remote DB
DB_NAME = "test"

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
donations_collection = db["donations"]
shortages_collection = db["shortages"]
print(shortages_collection)
# Function to fetch shortage data
def get_shortage_data():
    data = list(shortages_collection.find({}, {"_id": 0}))  
    return data

if __name__ == "__main__":
    print(get_shortage_data())  # Test data fetching
