const jwt = require("jsonwebtoken");

/**
 * Authentication Middleware
 * Protects routes by verifying JWT tokens
 *
 * How it works:
 * 1. Extracts token from Authorization header
 * 2. Verifies the token using JWT secret
 * 3. Attaches user info to request object
 * 4. Allows access to protected route
 */

/**
 * Middleware to protect routes (require authentication)
 * Usage: router.get('/protected-route', protect, controller)
 */
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Check if Authorization header exists and starts with 'Bearer'
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Extract token from 'Bearer <token>'
      token = req.headers.authorization.split(" ")[1];
    }

    // If no token found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please login to access this resource.",
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user info to request object
      // This makes user data available in the controller
      req.user = decoded;

      // Continue to the next middleware or controller
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please login again.",
      });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({
      success: false,
      message: "Server error in authentication",
    });
  }
};
