import React, { useState } from 'react';

function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    own_car: false,
    own_realty: false,
    children_count: '',
    annual_income: '',
    income_type: '',
    education_type: '',
    family_status: '',
    housing_type: '',
    birth_date: '',
    employment_date: '',
    mobile_phone: false,
    work_phone: false,
    phone: false,
    has_email: false,
    occupation_type: '',
    family_members: '',
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const DAYS_BIRTH = calculateDaysFromToday(formData.birth_date);
    const DAYS_EMPLOYED = calculateDaysFromToday(formData.employment_date);

    // Convert boolean values to 'Y' or 'N', dates to days, and ensure numeric fields are correctly parsed
    const submitData = {
      FLAG_OWN_CAR: formData.own_car ? 'Y' : 'N',
      FLAG_OWN_REALTY: formData.own_realty ? 'Y' : 'N',
      CNT_CHILDREN: parseInt(formData.children_count),
      AMT_INCOME_TOTAL: parseFloat(formData.annual_income),
      NAME_INCOME_TYPE: formData.income_type,
      NAME_EDUCATION_TYPE: formData.education_type,
      NAME_FAMILY_STATUS: formData.family_status,
      NAME_HOUSING_TYPE: formData.housing_type,
      DAYS_BIRTH, 
      DAYS_EMPLOYED,
      FLAG_MOBIL: formData.mobile_phone ? 1 : 0,
      FLAG_WORK_PHONE: formData.work_phone ? 1 : 0,
      FLAG_PHONE: formData.phone ? 1 : 0,
      FLAG_EMAIL: formData.has_email ? 1 : 0,
      OCCUPATION_TYPE: formData.occupation_type,
      CNT_FAM_MEMBERS: parseFloat(formData.family_members),
    };

    // Remove fields not expected by the backend
    delete submitData.birth_date;
    delete submitData.employment_date;

    const endpoint = 'http://127.0.0.1:5000/predict'; // Update '/predict' if using a different route

    try {
      console.log(JSON.stringify(submitData)); // Add this line before fetch call

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Application submitted! The result is: ', result);
        // Update the response message and show the modal
        setResponseMessage(`Application submitted! The result is: ${result.application_status}`);
        setIsModalVisible(true); // Show the modal
      } else {
        // You can customize this message based on the error
        setResponseMessage('Failed to submit application');
        setIsModalVisible(true); // Show the modal
      }
    } catch (error) {
      // Handle network errors or exceptions
      console.error('Error submitting form:', error);
    }
  };

  // Utility function to calculate days from today given a date string
  function calculateDaysFromToday(dateString) {
    const today = new Date();
    const date = new Date(dateString);
    return Math.floor((today - date) / (1000 * 60 * 60 * 24)) * -1;
  }


  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </label>
        <label>
          Own Car:
          <input type="checkbox" name="own_car" checked={formData.own_car} onChange={handleChange} />
        </label>
        <label>
          Own Realty:
          <input type="checkbox" name="own_realty" checked={formData.own_realty} onChange={handleChange} />
        </label>
        <label>
          Number of Children:
          <input type="number" name="children_count" value={formData.children_count} onChange={handleChange} />
        </label>
        <label>
          Annual Income:
          <input type="number" name="annual_income" value={formData.annual_income} onChange={handleChange} />
        </label>
        <label>
          Income Type:
          <input type="text" name="income_type" value={formData.income_type} onChange={handleChange} />
        </label>
        <label>
          Education Level:
          <input type="text" name="education_type" value={formData.education_type} onChange={handleChange} />
        </label>
        <label>
          Marital Status:
          <input type="text" name="family_status" value={formData.family_status} onChange={handleChange} />
        </label>
        <label>
          Housing Type:
          <input type="text" name="housing_type" value={formData.housing_type} onChange={handleChange} />
        </label>
        <label>
          Birth Date:
          <input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange} />
        </label>
        <label>
          Employment Start Date:
          <input type="date" name="employment_date" value={formData.employment_date} onChange={handleChange} />
        </label>
        <label>
          Mobile Phone:
          <input type="checkbox" name="mobile_phone" checked={formData.mobile_phone} onChange={handleChange} />
        </label>
        <label>
          Work Phone:
          <input type="checkbox" name="work_phone" checked={formData.work_phone} onChange={handleChange} />
        </label>
        <label>
          Phone:
          <input type="checkbox" name="phone" checked={formData.phone} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="checkbox" name="has_email" checked={formData.has_email} onChange={handleChange} />
        </label>
        <label>
          Occupation Type:
          <input type="text" name="occupation_type" value={formData.occupation_type} onChange={handleChange} />
        </label>
        <label>
          Family Members:
          <input type="number" name="family_members" value={formData.family_members} onChange={handleChange} />
        </label>
        <button type="submit">Submit Application</button>
      </form>
      <Modal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
      <p>{responseMessage}</p>
    </Modal>
    </div>
  );
}


function Modal({ isVisible, onClose, children }) {
  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    }}>
      <div style={{
        backgroundColor: 'grey', // Grey background for the modal
        color: 'black', // Black text color
        padding: 20,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional: add some shadow for better contrast
      }}>
        {children}
        <button onClick={onClose} style={{ marginTop: 20, padding: '5px 10px', cursor: 'pointer' }}>Close</button>
      </div>
    </div>
  );
}


export default Form;
