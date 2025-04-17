require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const predictionRoutes = require('./routes/predictionRoutes');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to DB
connectDB();

// Routes
app.use('/predict', predictionRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Diabetes Risk Predictor Backend');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
