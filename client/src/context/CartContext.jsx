import { createContext, useState, useEffect, useContext } from "react";

/**
 * Cart Context
 * Manages shopping cart state across the application
 *
 * Provides:
 * - cartItems: Array of items in cart
 * - addToCart: Function to add item to cart
 * - removeFromCart: Function to remove item from cart
 * - updateQuantity: Function to update item quantity
 * - clearCart: Function to clear all cart items
 * - getTotalPrice: Function to get total cart price
 * - getTotalItems: Function to get total item count
 */

// Create the context
const CartContext = createContext(null);

// Custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// CartProvider component
export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage using lazy initialization
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cartItems]);

  /**
   * Add item to cart
   * @param {Object} product - Product object
   * @param {number} quantity - Quantity to add (default: 1)
   */
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      // Check if product already exists in cart
      const existingItem = prevItems.find(
        (item) => item.product === product._id,
      );

      if (existingItem) {
        // Update quantity if product exists
        return prevItems.map((item) =>
          item.product === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        // Add new item to cart
        return [
          ...prevItems,
          {
            product: product._id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: quantity,
          },
        ];
      }
    });
  };

  /**
   * Remove item from cart
   * @param {string} productId - Product ID to remove
   */
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product !== productId),
    );
  };

  /**
   * Update item quantity in cart
   * @param {string} productId - Product ID
   * @param {number} quantity - New quantity
   */
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product === productId ? { ...item, quantity } : item,
      ),
    );
  };

  /**
   * Clear all items from cart
   */
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  /**
   * Calculate total price of all items in cart
   * @returns {number} Total price
   */
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  /**
   * Calculate total number of items in cart
   * @returns {number} Total item count
   */
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
