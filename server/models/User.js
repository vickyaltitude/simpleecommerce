const mongoose = require("mongoose");

/**
 * User Schema
 * Defines the structure for user documents in MongoDB
 *
 * Fields:
 * - name: User's full name
 * - email: User's email (unique, lowercase)
 * - password: Hashed password using bcrypt
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

// Create and export the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
