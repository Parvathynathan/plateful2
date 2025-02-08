import pandas as pd
from sklearn.preprocessing import LabelEncoder
import os

def load_data(file_path):
    """Load raw dataset with error handling."""
    try:
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"❌ Error: File not found at {file_path}")

        df = pd.read_csv(file_path)
        
        if df.empty:
            raise ValueError(f"⚠️ Warning: The dataset at {file_path} is empty.")

        print(f"✅ Data loaded successfully from {file_path}")
        return df

    except Exception as e:
        print(f"❌ Error loading data: {e}")
        return None

def preprocess_data(df):
    """Preprocess dataset: Handle categorical variables & feature engineering."""
    
    if df is None:
        print("❌ Error: No data to preprocess.")
        return None

    # Check if necessary columns exist
    required_columns = ["food_type", "expiry_days"]  # Adjust based on your dataset
    missing_cols = [col for col in required_columns if col not in df.columns]

    if missing_cols:
        print(f"⚠️ Warning: Missing required columns: {missing_cols}")
        return None

    # Encoding categorical feature
    if 'food_type' in df.columns:
        label_enc = LabelEncoder()
        df['food_type'] = label_enc.fit_transform(df['food_type'].astype(str))  # Ensure string type before encoding
    else:
        print("⚠️ Warning: 'food_type' column is missing.")

    # Remove 'storage_risk' if it exists
    df.drop(columns=["storage_risk"], inplace=True, errors="ignore")

    print("✅ Data preprocessing completed successfully.")
    return df

def save_processed_data(df, output_path):
    """Save processed data to CSV after ensuring directory existence."""
    if df is None or df.empty:
        print("❌ Error: No processed data to save.")
        return
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)  # Create directories if missing
    df.to_csv(output_path, index=False)
    print(f"✅ Processed data saved at {output_path}")

if __name__ == "__main__":
    input_path = os.path.join("data", "raw", "food_freshness_data.csv")
    output_path = os.path.join("data", "processed", "cleaned_data.csv")

    df = load_data(input_path)
    df = preprocess_data(df)
    save_processed_data(df, output_path)
