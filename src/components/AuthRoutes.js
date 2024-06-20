const { login } = require("../../backend/Routes/Controllers/AuthControllers");

const router = require("express").Router();

router.post("/");
router.post("/login", login);

module.exports = router;
