require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

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
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Simple E-commerce API",
    version: "1.0.0",
    endpoints: {
      auth: {
        register: "POST /api/auth/register",
        login: "POST /api/auth/login",
        me: "GET /api/auth/me",
      },
      products: {
        getAll: "GET /api/products",
        getById: "GET /api/products/:id",
        filterByCategory: "GET /api/products?category=Electronics",
      },
      orders: {
        create: "POST /api/orders",
        getUserOrders: "GET /api/orders",
        getById: "GET /api/orders/:id",
      },
    },
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// 404 Handler - Route not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global error handler (must be last)
app.use(errorHandler);

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

/* // Serve frontend build
app.use(express.static(path.join(__dirname, "../frontend/build")));

// React routing support
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
}); */

//npm install && cd ../frontend && npm install && npm run build

//node server.js
