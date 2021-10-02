const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema({
  name: String,
  type: String,
  signal: String,
  angSignal: String,
  modbus: Number,
});

module.exports = mongoose.model("Machine", machineSchema);
