const express = require("express");
const router = express.Router();

const {
  addUserAssembly,
  getUserAssemblybyID,
} = require("../controllers/loginAssembly.controller.js");

router.get("/:userUid", getUserAssemblybyID);
router.post("/", addUserAssembly);

module.exports = router;
