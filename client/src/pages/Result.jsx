import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || state.prediction === undefined) {
    return (
      <div>
        <h2>No prediction data found</h2>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Your Diabetes Risk Report</h2>
      <p>
        Based on your inputs, you are at:
        <strong>
          {' '}
          {state.prediction === 1 ? 'High Risk 😟' : 'Low Risk 🎉'}
        </strong>
      </p>
      <p>
        {state.prediction === 1
          ? 'It is recommended to consult with a healthcare provider for further diagnosis and guidance.'
          : 'Keep maintaining a healthy lifestyle and regular checkups.'}
      </p>
      <button onClick={() => navigate('/')}>Predict Again</button>
    </div>
  );
};

export default ResultPage;
