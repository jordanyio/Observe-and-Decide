from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, roc_curve, auc, precision_recall_curve, average_precision_score
import numpy as np

app = Flask(__name__)
CORS(app)

# Assuming 'df' is your dataset loaded from csv files as shown in the provided code
# Define a function to train your model
def train_model():
    application_record_df = pd.read_csv("./Resources/application_record.csv")
    credit_record_df = pd.read_csv("./Resources/credit_record.csv")
    merged_df = pd.merge(application_record_df, credit_record_df, on='ID', how='inner')
    df = merged_df.copy()
    df['Target'] = np.nan

    # Step 1: Calculate the number of '0' appearances and total months recorded for each user
    zero_counts_per_user = df[df['STATUS'] == '0'].groupby('ID')['STATUS'].apply(lambda x: (x == '0').sum())
    total_months_per_user = df.groupby('ID')['MONTHS_BALANCE'].nunique()

    # Step 2: Calculate average number of '0' appearances per 12 months for each user
    average_zeros_per_12_months_per_user = zero_counts_per_user / total_months_per_user * 12

    target_average_zeros = 5.25

    # Group by 'ID' and check conditions
    for id, group in df.groupby('ID'):
        # Initialize target as None
        target = None
        
        # Condition 1: Check if any status is not 'C' or 'X'
        if not all(group['STATUS'].isin(['C', 'X', '0'])):
            target = 0
        # Condition 2: Check for at least one 'MONTHS_BALANCE' >= 12 (in absolute)
        elif not any(group['MONTHS_BALANCE'].abs() >= 6):
            target = 0

        elif average_zeros_per_12_months_per_user.get(id, 0) >= target_average_zeros:
            target = 0
        # Condition 3: Calculate the average frequency of 'C' and compare to 56%
        else:
            c_frequency = (group['STATUS'] == 'C').mean() * 100
            target = 1 if c_frequency >= 30 else 0
        
        # Assign target value for the group
        df.loc[df['ID'] == id, 'Target'] = target

    # Check if there are still any NaN values in 'Target'
    nan_in_target = df['Target'].isna().sum()
    print(f"NaN values in 'Target': {nan_in_target}")

    training_df = df.copy()

    X = training_df.drop(['Target', 'STATUS', 'MONTHS_BALANCE', 'ID', 'CODE_GENDER'], axis=1) 
    y = training_df['Target']

    # Splitting the dataset into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=70)

    # Identify numerical and categorical columns (example placeholders)
    numerical_cols = X_train.select_dtypes(include=['int64', 'float64']).columns
    categorical_cols = X_train.select_dtypes(include=['object', 'category']).columns

    # Step 2: Define preprocessing pipelines
    numerical_transformer = StandardScaler()
    categorical_transformer = OneHotEncoder(handle_unknown='ignore')

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numerical_transformer, numerical_cols),
            ('cat', categorical_transformer, categorical_cols)
        ])


    # Step 3: Define the model
    model = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('classifier', RandomForestClassifier(class_weight='balanced', random_state=42))
    ])

    # Train the model
    model.fit(X_train, y_train)
    print('Model is trained!')
    return model

# Train your model on server startup
# Assuming 'merged_df' is available from your earlier code, replace 'df' with 'merged_df' or the appropriate DataFrame
model = train_model()

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        try:
            data = request.get_json()
            input_data = pd.DataFrame([data])
            
            # Directly predict using the trained model
            prediction = model.predict(input_data)
            result = prediction[0]
            
            # Map your prediction to a meaningful response
            application_status = 'Approved' if result == 1 else 'Declined'
            
            return jsonify({'application_status': application_status})
        except Exception as e:
            return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)