const axios = require('axios');

const predictDiabetes = async (req, res) => {
  try {
    const predictionData = req.body;
    const response = await axios.post(
      'http://localhost:5001/predict', // Assuming the Flask/FastAPI model server is running on port 5001
      predictionData
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error in prediction' });
  }
};

module.exports = { predictDiabetes };
