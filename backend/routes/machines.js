const express = require("express");
const Machine = require("../models/machine");

const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.get("/", (req, res, next) => {
  Machine.find().then((documents) => {
    console.log(documents);
    res.status(200).json({
      message: "Machines fetched successfully!",
      machines: documents,
    });
  });
});

router.get("/:id", (req, res, next) => {
  Machine.findById(req.params.id).then((machine) => {
    if (machine) {
      res.status(200).json(machine);
    } else {
      res.status(404).json({ message: "Machine not found!" });
    }
  });
});

router.post("/", checkAuth, (req, res, next) => {
  let machine = new Machine({
    name: req.body.name,
    type: req.body.type,
    signal: req.body.signal,
    angSignal: req.body.angSignal,
    modbus: req.body.modbus,
  });
  console.log(machine);
  machine.save().then((createdMachine) => {
    console.log(createdMachine);
    res.status(201).json({
      message: "Machine added succesfully!",
      machineId: createdMachine._id,
    });
  });
});

router.put("/:id", checkAuth, (req, res, next) => {
  const machine = new Machine({
    _id: req.body.id,
    name: req.body.name,
    type: req.body.type,
    signalType: req.body.signalType,
    analogSignal: req.body.analogSignal,
    modbus: req.body.modbus,
  });
  Machine.updateOne({ _id: req.params.id }, machine).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Update succesful!" });
  });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  console.log(req.params.id);
  Machine.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = router;
