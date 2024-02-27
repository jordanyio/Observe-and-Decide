import React, { useState } from 'react';

function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    income: '',
    gender: '',
    own_car: '',
    own_realty: '',
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

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Replace `YOUR_BACKEND_ENDPOINT` with your actual backend endpoint
    const response = await fetch('YOUR_BACKEND_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log('Application submitted');
      // Handle successful form submission (e.g., showing a thank you message)
    } else {
      console.error('Failed to submit application');
      // Handle errors
    }
  };

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
    </div>
  );
}

export default Form;
