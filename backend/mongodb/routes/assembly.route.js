const express = require("express");
const router = express.Router();
const {
  getAssembly,
  getAssemblyByID,
  addAssembly,
  updateAssembly,
  deleteAssembly,
} = require("../controllers/assembly.controller.js");

router.get("/", getAssembly);

router.get("/:id", getAssemblyByID);

router.post("/", addAssembly);

router.put("/:id", updateAssembly);

router.delete("/:id", deleteAssembly);

module.exports = router;
