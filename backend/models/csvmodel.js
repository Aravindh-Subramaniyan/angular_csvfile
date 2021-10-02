const mongoose = require("mongoose");

const csvSchema = new mongoose.Schema({
  RollNo: Number,
  Name: String,
  Mark: Number,
  Age: Number,
});

module.exports = mongoose.model("CSV", csvSchema);
