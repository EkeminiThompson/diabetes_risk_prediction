import React from 'react';
import '../index.css';

const ResultCard = ({ result }) => {
  return (
    <div className="result-card">
      <h2>Your Diabetes Risk:</h2>
      <p>{result === 1 ? 'High Risk 😟' : 'Low Risk 🎉'}</p>
    </div>
  );
};

export default ResultCard;
