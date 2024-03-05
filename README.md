# Observe-and-Decide

# Predictive Analytics for Credit Card Applicant Approval

## Introduction

This project aims to employ predictive analytics to achieve strategic customer segmentation and make informed decisions on credit card approvals. It utilizes two distinct datasets: Predicting Credit Card Customer Segmentation and Credit Card Approval Prediction, to develop models that enhance customer service and operational efficiency.

## Objectives

- **Credit Card Approval Prediction**: To predict the approval status of credit card applications using machine learning model, improving decision-making processes.

## How to Use

1. Clone this repository.
2. Run the Jupyter notebooks for detailed analysis and model building steps.
3. cd int0 Frontend/credit-window run npm install, npm run dev. Install any dependancies first.
4. cd into backend. run python app.py. Install all depandcies first.
5. Wait for the backend to confirm the model is trained before running requests. Depenging on your machine this could take up to 5-10 minutes. 

## Project Architecture and walkthrough

1. At the head level, there are three folders... Notebooks, Frontend and Backend.
   - Notebooks: Contains the Applicant approval decsion model notebook.
   - Backend: Contains the Flask server that will respond to the front end by using the model to make a decision. 
   - Frontend: Contains the source code for a React js frontend UI, the application that makes use of the decsion model from the Notebooks folder.
  
## Datasets

1. **Credit Card Approval Datasets**: Contains applicant's personal information, financial history.

## Methodology

### Data Preprocessing

- Cleaning, FIltering, Feature Engineering
- Transformation: Normalizing and encoding features for model compatibility.

### Model Development

- Utilizing classification algorithms (Random Forest) for approval prediction.

### Evaluation

- Prediction model performance assessed using accuracy, precision, and recall metrics.

## Results

- Improved accuracy in predicting credit card approval, enhancing customer satisfaction and operational efficiency.



