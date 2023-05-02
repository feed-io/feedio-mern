// routes/users.js
const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const checkAuth = require("../middleware/check-auth");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.use(checkAuth);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
