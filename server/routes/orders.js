const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { protect } = require("../middleware/auth");

// Create new order (protected)
router.post("/", protect, orderController.createOrder);

// Get all orders for logged-in user (protected)
router.get("/", protect, orderController.getUserOrders);

// Get specific order by ID (protected)
router.get("/:id", protect, orderController.getOrderById);

module.exports = router;
