const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const machineRoutes = require("./routes/machines");
const csvRoutes = require("./models/csvmodel");
const userRoutes = require("./routes/user");
const { ConsoleReporter } = require("jasmine");
const app = express();

app.use(cors());

mongoose
  .connect("mongodb://localhost/wimer-task")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to Mongo DB...", err));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/machines", machineRoutes);
app.use("/api/user", userRoutes);
app.use(express.urlencoded());
app.use(express.json());
app.post("/api/csvdata", (req, res) => {
  var data = req.body;
  console.log(data);
  res.status(201).json({
    message: "Data sent successfully",
  });
});

module.exports = app;
