# Observe-and-Decide

# Predictive Analytics for Credit Card Customer Segmentation and Approval

## Introduction

This project aims to employ predictive analytics to achieve strategic customer segmentation and make informed decisions on credit card approvals. It utilizes two distinct datasets: Predicting Credit Card Customer Segmentation and Credit Card Approval Prediction, to develop models that enhance customer service and operational efficiency.

## Objectives

- **Customer Segmentation**: To segment the credit card customer base to identify valuable customers and tailor services accordingly.
- **Credit Card Approval Prediction**: To predict the approval status of credit card applications using machine learning models, improving decision-making processes.

## How to Use

1. Clone this repository.
2. Install dependencies: `pip install -r requirements.txt`.
3. Run the Jupyter notebooks for detailed analysis and model building steps.

## Project Architecture and walkthrough

1. At the head level, there are two folders... Notebooks, and Src.
   - Notebooks: Contains two folders, One contains the customer segmentation notebooks, the other contains the Applicant approval decsion notebooks
   - Src: Contains the source code for the application that makes use of the highest performing Applicant decsion model from the Notebooks folder.
  
2. The notebooks display how the data was cleaned and wrangled, and how the models were trained and evaluated
3. The Src application displays how a trained model could be used in production, by getting the applicants data from a user interface to a backend server where the trained model can be reused in real time, responding to the applicant with a descision. 

## Datasets

1. **Customer Segmentation Dataset**: Includes customer demographics, spending behavior, and transaction data.
2. **Credit Card Approval Dataset**: Contains applicant's personal information, financial history.

## Methodology

### Data Preprocessing

- Cleaning: Removing outliers, handling missing values.
- Transformation: Normalizing and encoding features for model compatibility.

### Model Development

- Employing clustering techniques for customer segmentation.
- Utilizing classification algorithms (e.g., Logistic Regression, Random Forest) for approval prediction.

### Evaluation

- Prediction model performance assessed using accuracy, precision, and recall metrics.

## Results

- Achieved distinct customer segments with tailored marketing strategies.
- Improved accuracy in predicting credit card approval, enhancing customer satisfaction and operational efficiency.



