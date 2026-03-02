const mongoose = require("mongoose");

/**
 * Order Schema
 * Defines the structure for order documents in MongoDB
 *
 * Fields:
 * - user: Reference to the User who placed the order
 * - items: Array of products in the order (with details snapshot)
 * - totalAmount: Total price of the order
 * - shippingAddress: Delivery address
 * - status: Current order status
 */
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        imageUrl: {
          type: String,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Total amount cannot be negative"],
    },
    shippingAddress: {
      street: {
        type: String,
        required: [true, "Street address is required"],
      },
      city: {
        type: String,
        required: [true, "City is required"],
      },
      postalCode: {
        type: String,
        required: [true, "Postal code is required"],
      },
      country: {
        type: String,
        required: [true, "Country is required"],
      },
    },
    status: {
      type: String,
      enum: {
        values: ["Pending", "Confirmed", "Delivered"],
        message: "{VALUE} is not a valid status",
      },
      default: "Pending",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

// Create and export the Order model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
