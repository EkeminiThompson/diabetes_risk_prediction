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
    age: '',
    physicalActivity: 'low',
    smoking: 'no',
    diet: 'average',
    alcohol: 'never'
  });

  const [activeField, setActiveField] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNumberInput = (name, value) => {
    // Ensure numeric values are valid
    if (value === '' || (!isNaN(value) && value >= 0)) {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const numericData = {
        pregnancies: Number(form.pregnancies),
        glucose: Number(form.glucose),
        bloodPressure: Number(form.bloodPressure),
        skinThickness: Number(form.skinThickness),
        insulin: Number(form.insulin),
        bmi: Number(form.bmi),
        diabetesPedigreeFunction: Number(form.diabetesPedigreeFunction),
        age: Number(form.age),
      };

      const lifestyleData = {
        physicalActivity: form.physicalActivity,
        smoking: form.smoking,
        diet: form.diet,
        alcohol: form.alcohol,
      };

      await onResult({ predictionInput: numericData, lifestyle: lifestyleData });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace('Diabetes Pedigree Function', 'Genetic Influence');
  };

  const getInputRangeInfo = (name) => {
    const ranges = {
      glucose: { min: 50, max: 200, unit: 'mg/dL' },
      bloodPressure: { min: 40, max: 140, unit: 'mmHg' },
      bmi: { min: 10, max: 50, unit: 'kg/m²' },
      age: { min: 1, max: 120, unit: 'years' }
    };
    return ranges[name] || { min: 0, max: 100, unit: '' };
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1 className="form-title">Diabetes Risk Assessment</h1>
        <p className="form-subtitle">
          {currentStep === 1 ? 'Enter your medical information' : 'Tell us about your lifestyle'}
        </p>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${currentStep === 1 ? 50 : 100}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="health-form">
        {currentStep === 1 ? (
          <section className="form-section">
            <h2 className="section-title">Medical Information</h2>
            <div className="input-grid">
              {[
                'pregnancies', 'glucose', 'bloodPressure', 'skinThickness',
                'insulin', 'bmi', 'diabetesPedigreeFunction', 'age'
              ].map((key) => {
                const rangeInfo = getInputRangeInfo(key);
                return (
                  <div 
                    className={`form-group ${activeField === key ? 'active' : ''}`}
                    key={key}
                    onClick={() => setActiveField(key)}
                  >
                    <label className="form-label">
                      {formatLabel(key)}
                      {form[key] && (
                        <span className="input-value">
                          {form[key]} {rangeInfo.unit}
                        </span>
                      )}
                    </label>
                    <input
                      type="number"
                      name={key}
                      value={form[key]}
                      onChange={(e) => handleNumberInput(key, e.target.value)}
                      onFocus={() => setActiveField(key)}
                      onBlur={() => setActiveField(null)}
                      required
                      className="form-input"
                      min={rangeInfo.min}
                      max={rangeInfo.max}
                      step={key === 'bmi' || key === 'diabetesPedigreeFunction' ? 0.1 : 1}
                      placeholder={`${rangeInfo.min}-${rangeInfo.max}`}
                    />
                    <div className="input-underline"></div>
                    {activeField === key && (
                      <div className="range-hint">
                        Normal range: {rangeInfo.min}-{rangeInfo.max} {rangeInfo.unit}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="form-navigation">
              <button 
                type="button" 
                className="next-button"
                onClick={nextStep}
                disabled={Object.values(form).slice(0, 8).some(val => val === '')}
              >
                Continue to Lifestyle Factors
                <svg className="button-icon" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </section>
        ) : (
          <section className="form-section">
            <h2 className="section-title">Lifestyle Factors</h2>
            <div className="lifestyle-grid">
              <div className="form-group lifestyle-card">
                <label className="form-label">Physical Activity</label>
                <div className="radio-group">
                  {[
                    { value: 'low', label: 'Low', icon: '🛋️' },
                    { value: 'moderate', label: 'Moderate', icon: '🚶‍♂️' },
                    { value: 'high', label: 'High', icon: '🏋️‍♂️' }
                  ].map(option => (
                    <label key={option.value} className={`radio-option ${form.physicalActivity === option.value ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="physicalActivity"
                        value={option.value}
                        checked={form.physicalActivity === option.value}
                        onChange={handleChange}
                        className="radio-input"
                      />
                      <span className="radio-icon">{option.icon}</span>
                      <span className="radio-label">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group lifestyle-card">
                <label className="form-label">Smoking Habits</label>
                <div className="radio-group">
                  {[
                    { value: 'no', label: 'Non-smoker', icon: '🚭' },
                    { value: 'yes', label: 'Smoker', icon: '🚬' }
                  ].map(option => (
                    <label key={option.value} className={`radio-option ${form.smoking === option.value ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="smoking"
                        value={option.value}
                        checked={form.smoking === option.value}
                        onChange={handleChange}
                        className="radio-input"
                      />
                      <span className="radio-icon">{option.icon}</span>
                      <span className="radio-label">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group lifestyle-card">
                <label className="form-label">Diet Quality</label>
                <div className="radio-group">
                  {[
                    { value: 'poor', label: 'Needs work', icon: '🍔' },
                    { value: 'average', label: 'Average', icon: '🥗' },
                    { value: 'healthy', label: 'Excellent', icon: '🥑' }
                  ].map(option => (
                    <label key={option.value} className={`radio-option ${form.diet === option.value ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="diet"
                        value={option.value}
                        checked={form.diet === option.value}
                        onChange={handleChange}
                        className="radio-input"
                      />
                      <span className="radio-icon">{option.icon}</span>
                      <span className="radio-label">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group lifestyle-card">
                <label className="form-label">Alcohol Consumption</label>
                <div className="radio-group">
                  {[
                    { value: 'never', label: 'Never', icon: '🚱' },
                    { value: 'occasionally', label: 'Occasionally', icon: '🍷' },
                    { value: 'frequently', label: 'Regularly', icon: '🍺' }
                  ].map(option => (
                    <label key={option.value} className={`radio-option ${form.alcohol === option.value ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="alcohol"
                        value={option.value}
                        checked={form.alcohol === option.value}
                        onChange={handleChange}
                        className="radio-input"
                      />
                      <span className="radio-icon">{option.icon}</span>
                      <span className="radio-label">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="form-navigation">
              <button 
                type="button" 
                className="back-button"
                onClick={prevStep}
              >
                <svg className="button-icon" viewBox="0 0 24 24">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to Medical Info
              </button>
              
              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="spinner"></span>
                ) : (
                  <>
                    <span>Analyze My Risk</span>
                    <svg className="button-icon" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </section>
        )}

        <div className="form-footer">
          <p className="form-note">
            <svg className="lock-icon" viewBox="0 0 24 24">
              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v2h8z"/>
            </svg>
            Your data is processed securely and never stored
          </p>
        </div>
      </form>

      <style jsx>{`
        .form-container {
          max-width: 900px;
          margin: 2rem auto;
          padding: 0;
          background: white;
          border-radius: 24px;
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .form-header {
          padding: 2.5rem 2.5rem 1.5rem;
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          color: white;
        }
        
        .form-title {
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 0.5rem;
          letter-spacing: -0.5px;
        }
        
        .form-subtitle {
          font-size: 1rem;
          opacity: 0.9;
          margin: 0;
          font-weight: 400;
        }
        
        .progress-bar {
          height: 6px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
          margin-top: 1.5rem;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: white;
          border-radius: 3px;
          transition: width 0.3s ease;
        }
        
        .health-form {
          display: flex;
          flex-direction: column;
        }
        
        .form-sections {
          padding: 2rem 2.5rem;
        }
        
        .form-section {
          margin-bottom: 2.5rem;
        }
        
        .section-title {
          font-size: 1.25rem;
          color: #1e293b;
          margin: 0 0 1.5rem;
          font-weight: 600;
          position: relative;
          padding-left: 1rem;
        }
        
        .section-title::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 4px;
          background: #4f46e5;
          border-radius: 2px;
        }
        
        .input-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1.5rem;
        }
        
        .lifestyle-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1.5rem;
        }
        
        .form-group {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .form-group.active .form-label {
          transform: translateY(-5px);
          opacity: 1;
        }
        
        .form-group.active .input-underline {
          transform: scaleX(1);
        }
        
        .form-label {
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 500;
          transition: all 0.2s ease;
          display: flex;
          justify-content: space-between;
        }
        
        .input-value {
          color: #1e293b;
          font-weight: 600;
        }
        
        .form-input {
          padding: 0.75rem 0;
          border: none;
          border-bottom: 1px solid #e2e8f0;
          font-size: 1rem;
          transition: all 0.2s;
          background: transparent;
          font-weight: 500;
          color: #1e293b;
        }
        
        .form-input:focus {
          outline: none;
          border-bottom-color: transparent;
        }
        
        .input-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: #4f46e5;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        
        .range-hint {
          font-size: 0.75rem;
          color: #64748b;
          margin-top: 0.25rem;
        }
        
        .lifestyle-card {
          background: #f8fafc;
          border-radius: 12px;
          padding: 1.25rem;
          transition: all 0.2s;
        }
        
        .lifestyle-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        
        .radio-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }
        
        .radio-option {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid #e2e8f0;
          background: white;
        }
        
        .radio-option:hover {
          border-color: #c7d2fe;
        }
        
        .radio-option.selected {
          border-color: #4f46e5;
          background: #f5f3ff;
        }
        
        .radio-icon {
          font-size: 1.25rem;
        }
        
        .radio-label {
          font-size: 0.9rem;
          font-weight: 500;
          color: #1e293b;
        }
        
        .radio-input {
          position: absolute;
          opacity: 0;
          height: 0;
          width: 0;
        }
        
        .form-navigation {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
          gap: 1rem;
        }
        
        .next-button, .back-button, .submit-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 1.5rem;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          gap: 0.75rem;
          transition: all 0.2s;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .next-button, .submit-button {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          color: white;
        }
        
        .next-button:hover, .submit-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 12px rgba(79, 70, 229, 0.15);
        }
        
        .next-button:disabled, .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        
        .back-button {
          background: white;
          color: #4f46e5;
          border: 1px solid #e2e8f0;
        }
        
        .back-button:hover {
          background: #f8fafc;
        }
        
        .button-icon {
          width: 20px;
          height: 20px;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: none;
        }
        
        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .form-footer {
          padding: 1.5rem 2.5rem;
          border-top: 1px solid #f1f5f9;
          background: #f8fafc;
        }
        
        .form-note {
          font-size: 0.75rem;
          color: #94a3b8;
          text-align: center;
          margin-top: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        
        .lock-icon {
          width: 14px;
          height: 14px;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: none;
        }
        
        @media (max-width: 768px) {
          .form-container {
            margin: 1rem;
            border-radius: 16px;
          }
          
          .form-header {
            padding: 1.5rem 1.5rem 1rem;
          }
          
          .form-title {
            font-size: 1.5rem;
          }
          
          .form-sections {
            padding: 1.5rem;
          }
          
          .input-grid, .lifestyle-grid {
            grid-template-columns: 1fr;
          }
          
          .form-footer {
            padding: 1.5rem;
          }
          
          .form-navigation {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default InputForm;