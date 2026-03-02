const Order = require("../models/Order");
const Product = require("../models/Product");

exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, totalAmount } = req.body;
    const userId = req.user.userId; // From auth middleware

    // Validate that items array is not empty
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one item",
      });
    }

    // Validate shipping address
    if (
      !shippingAddress ||
      !shippingAddress.street ||
      !shippingAddress.city ||
      !shippingAddress.postalCode ||
      !shippingAddress.country
    ) {
      return res.status(400).json({
        success: false,
        message: "Complete shipping address is required",
      });
    }

    // Verify products exist and have sufficient stock
    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product with ID ${item.product} not found`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}. Available: ${product.stock}`,
        });
      }
    }

    // Create order
    const order = await Order.create({
      user: userId,
      items,
      totalAmount,
      shippingAddress,
      status: "Pending",
    });

    // Optional: Update product stock (uncomment if you want to reduce stock)
    // for (const item of items) {
    //   await Product.findByIdAndUpdate(item.product, {
    //     $inc: { stock: -item.quantity }
    //   });
    // }

    // Populate order with user and product details
    await order.populate("user", "name email");
    await order.populate("items.product", "name price");

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error creating order",
    });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.userId; // From auth middleware

    // Find all orders for this user, sorted by newest first
    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("items.product", "name price imageUrl");

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error fetching orders",
    });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId; // From auth middleware

    // Find order by ID
    const order = await Order.findById(id)
      .populate("user", "name email")
      .populate("items.product", "name price imageUrl");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check if order belongs to the logged-in user
    if (order.user._id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access this order",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get order error:", error);

    // Handle invalid ObjectId format
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Server error fetching order",
    });
  }
};
