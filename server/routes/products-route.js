// routes/users.js
const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const checkAuth = require("../middleware/check-auth");

router.use(checkAuth);
router.get("/all", productController.getAllProducts);
router.post("/createProduct", productController.createProduct);
router.get("/:pid", productController.getProductById);
router.put("/:pid", productController.updateProduct);
router.delete("/:pid", productController.deleteProduct);

module.exports = router;
