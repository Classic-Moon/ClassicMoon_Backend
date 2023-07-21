const mongoose = require("mongoose");

const graphSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now() },
  luncPrice: { type: Number, default: 0 },
  clsmPrice: { type: Number, default: 0 },
  ustcPrice: { type: Number, default: 0 },
});

module.exports = graph = mongoose.model("graph", graphSchema);
