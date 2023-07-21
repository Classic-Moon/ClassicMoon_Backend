const express = require('express');
const router = express.Router();
const getPriceHistory = require("./getPriceHistory");

// getPriceHistory
router.get('/getPriceHistory', getPriceHistory);

module.exports = router;