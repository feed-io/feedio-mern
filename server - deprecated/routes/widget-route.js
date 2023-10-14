const express = require("express");
const widgetController = require("../controllers/widgetController");

const router = express.Router();

router.post("/config", widgetController.generateWidget);
router.get("/:wid/serve", widgetController.serveWidget);
router.get("/:wid", widgetController.getWidget);

module.exports = router;
