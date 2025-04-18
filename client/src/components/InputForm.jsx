import React, { useState } from 'react';

const InputForm = ({ onResult }) => {
  const [form, setForm] = useState({
    pregnancies: '',
    glucose: '',
    bloodPressure: '',
    skinThickness: '',
    insulin: '',
    bmi: '',
    diabetesPedigreeFunction: '',
    age: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      pregnancies: Number(form.pregnancies),
      glucose: Number(form.glucose),
      bloodPressure: Number(form.bloodPressure),
      skinThickness: Number(form.skinThickness),
      insulin: Number(form.insulin),
      bmi: Number(form.bmi),
      diabetesPedigreeFunction: Number(form.diabetesPedigreeFunction),
      age: Number(form.age),
    };
    await onResult(formData); // call the function from parent
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', maxWidth: 400, margin: '0 auto' }}>
      {Object.entries(form).map(([key, value]) => (
        <div key={key}>
          <label>{key}:</label>
          <input
            type="number"
            name={key}
            value={value}
            onChange={handleChange}
            required
          />
        </div>
      ))}
      <button type="submit">Predict</button>
    </form>
  );
};

export default InputForm;
