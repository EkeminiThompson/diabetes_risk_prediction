import React from 'react';
import { useNavigate } from 'react-router-dom';
import InputForm from '../components/InputForm';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();

  const handleResult = async ({ predictionInput, lifestyle }) => {
    try {
      const res = await axios.post('http://localhost:5000/predict', predictionInput);
      const prediction = res.data.prediction;

      navigate('/results', {
        state: {
          prediction,
          predictionInput,
          lifestyle
        }
      });
    } catch (error) {
      console.error('Prediction error:', error);
      alert('Prediction failed. Please try again.');
    }
  };

  return (
    <div>
      <h1>Diabetes Risk Predictor</h1>
      <InputForm onResult={handleResult} />
    </div>
  );
};

export default Home;
