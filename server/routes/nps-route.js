const express = require("express");
const router = express.Router();
const npsController = require("../controllers/npsController");

router.get("/nps", npsController.getNPSScore);

module.exports = router;
