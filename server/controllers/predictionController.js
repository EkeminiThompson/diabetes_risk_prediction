const axios = require('axios');

const predictDiabetes = async (req, res) => {
  try {
    const predictionData = {
      Pregnancies: Number(req.body.pregnancies),
      Glucose: Number(req.body.glucose),
      BloodPressure: Number(req.body.bloodPressure),
      SkinThickness: Number(req.body.skinThickness),
      Insulin: Number(req.body.insulin),
      BMI: Number(req.body.bmi),
      DiabetesPedigreeFunction: Number(req.body.diabetesPedigreeFunction),
      Age: Number(req.body.age),
    };

    console.log('Sending data to ML API:', predictionData);

    const response = await axios.post(
      'http://127.0.0.1:5001/predict', // 👈 Use IPv4
      predictionData
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      'Error occurred while predicting:',
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      message: 'Error in prediction',
      error: error.response ? error.response.data : error.message,
    });
  }
};


module.exports = { predictDiabetes };
