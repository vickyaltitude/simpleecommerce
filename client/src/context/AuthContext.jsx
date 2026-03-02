import { createContext, useState, useEffect, useContext } from "react";
import * as authService from "../services/authService";

/**
 * Authentication Context
 * Manages user authentication state across the application
 *
 * Provides:
 * - user: Current user object
 * - isAuthenticated: Boolean indicating if user is logged in
 * - loading: Boolean for initial auth check
 * - login: Function to login user
 * - register: Function to register user
 * - logout: Function to logout user
 */

// Create the context
const AuthContext = createContext(null);

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (on app mount)
  useEffect(() => {
    const initAuth = () => {
      try {
        const storedUser = authService.getStoredUser();
        const token = localStorage.getItem("token");

        if (storedUser && token) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  /**
   * Login function
   * @param {Object} credentials - { email, password }
   */
  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);

      if (response.data.success) {
        setUser(response.data.user);
        return { success: true, message: response.data.message };
      }

      return { success: false, message: response.data.message };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Login failed. Please try again.",
      };
    }
  };

  /**
   * Register function
   * @param {Object} userData - { name, email, password }
   */
  const register = async (userData) => {
    try {
      const response = await authService.register(userData);

      if (response.data.success) {
        setUser(response.data.user);
        return { success: true, message: response.data.message };
      }

      return { success: false, message: response.data.message };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
      };
    }
  };

  /**
   * Logout function
   * Clears user state and localStorage
   */
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Compute isAuthenticated based on user state
  const isAuthenticated = !!user;

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
