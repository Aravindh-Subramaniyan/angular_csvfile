const mongoose = require("mongoose");

const csvSchema = new mongoose.Schema({
  RollNo: Number,
  Name: String,
  Mark: Number,
  Age: Number,
  id: Number,
});

module.exports = mongoose.model("CSV", csvSchema);
