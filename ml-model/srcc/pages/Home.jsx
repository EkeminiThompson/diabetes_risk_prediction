import React, { useState } from 'react';
import InputForm from '../components/InputForm';
import ResultCard from '../components/ResultCard';

const Home = () => {
  const [prediction, setPrediction] = useState(null);

  return (
    <div>
      <h1>Diabetes Risk Predictor</h1>
      <InputForm onResult={setPrediction} />
      {prediction !== null && <ResultCard result={prediction} />}
    </div>
  );
};

export default Home;
