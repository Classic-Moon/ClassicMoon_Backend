const express = require('express');
const graph = require("./graph");
const price = require("./price");

const router = express.Router();

router.use("/graph", graph);
router.use("/price", price);

module.exports = router;
