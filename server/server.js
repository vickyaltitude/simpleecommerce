require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const path = require("path");

// Import routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

/**
 * Express Server Setup
 * Simple E-commerce API
 */

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
// 1. CORS - Allow frontend to access backend
app.use(
  cors({
    origin: "http://localhost:5173", // Vite default port
    credentials: true,
  }),
);

// 2. Body parser - Parse JSON request bodies
app.use(express.json());

// 3. URL-encoded parser - Parse form data
app.use(express.urlencoded({ extended: true }));

// Welcome route

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

if (process.env.NODE_ENV === "production") {
  // serve frontend build files
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "/index.html"));
  });
}
// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("=================================");
  console.log("🚀 Server is running!");
  console.log(`📡 Port: ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV}`);
  console.log("=================================");
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Promise Rejection:", err);
  // Close server and exit process
  process.exit(1);
});

//npm install && cd ../frontend && npm install && npm run build

//node server.js
