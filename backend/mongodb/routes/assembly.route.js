const express = require("express");
const router = express.Router();
const {
  getAssembly,
  getAssemblyByID,
  addAssembly,
  updateAssembly,
  deleteAssembly,
  getAssembliesByDateRange,
  getSensorWiseCount,
} = require("../controllers/assembly.controller.js");

router.get("/getAssemblybyDateRange", getAssembliesByDateRange);

router.get("/sensor/count", getSensorWiseCount);

router.get("/", getAssembly);

router.get("/:id", getAssemblyByID);

router.post("/", addAssembly);

router.put("/:id", updateAssembly);

router.delete("/:id", deleteAssembly);

module.exports = router;
