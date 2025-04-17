import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const prediction = location.state?.prediction;

  return (
    <div>
      <h1>Prediction Result</h1>
      <p>
        {prediction === 1 ? 'You are at high risk of diabetes.' : 'You are at low risk of diabetes.'}
      </p>
      <Link to="/">Go back</Link>
    </div>
  );
};

export default Result;
