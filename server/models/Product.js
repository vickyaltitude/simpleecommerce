const mongoose = require("mongoose");

/**
 * Product Schema
 * Defines the structure for product documents in MongoDB
 *
 * Fields:
 * - name: Product name
 * - description: Product description
 * - price: Product price (must be positive)
 * - category: Product category (predefined options)
 * - imageUrl: URL to product image
 * - stock: Available quantity in inventory
 */
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: {
        values: ["Electronics", "Clothing", "Books", "Food", "Sports"],
        message: "{VALUE} is not a valid category",
      },
    },
    imageUrl: {
      type: String,
      required: [true, "Product image URL is required"],
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

// Create and export the Product model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
