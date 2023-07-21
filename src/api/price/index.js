const express = require('express');
const router = express.Router();
const getPrices = require("./getPrices");

// getPrices
router.get('/getPrices', getPrices);

module.exports = router;