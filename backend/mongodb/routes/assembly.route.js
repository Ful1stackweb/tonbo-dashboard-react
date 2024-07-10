const express = require("express");
const router = express.Router();
const {
  getAssembly,
  getAssemblyFailStatus,
  getAssemblyByID,
  addAssembly,
  updateAssembly,
  deleteAssembly,
  getAssembliesByDateRange,
  getSensorWiseCount,
  getAssemblyByCurrentDateType,
} = require("../controllers/assembly.controller.js");

router.get("/getAssemblybyDateRange", getAssembliesByDateRange);

router.get("/sensor/count", getSensorWiseCount);

router.get("/sensor/currentDay", getAssemblyByCurrentDateType);

router.get("/", getAssembly);

router.get("/:status", getAssemblyFailStatus);

router.get("/:id", getAssemblyByID);

router.post("/", addAssembly);

router.put("/:tonboSlNo", updateAssembly);

router.delete("/:id", deleteAssembly);

module.exports = router;
