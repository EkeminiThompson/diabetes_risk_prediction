const express = require('express');
const router = express.Router();
const { predictDiabetes } = require('../controllers/predictionController');

router.post('/', predictDiabetes);

module.exports = router;
