import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/helpers";

/**
 * Cart Page
 * Displays shopping cart items with quantity controls
 */

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
  } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemove = (productId) => {
    if (confirm("Are you sure you want to remove this item from cart?")) {
      removeFromCart(productId);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <i className="bi bi-cart-x display-1 text-muted"></i>
          <h2 className="mt-3">Your cart is empty</h2>
          <p className="text-muted mb-4">
            Looks like you haven't added any products yet.
          </p>
          <Link to="/products" className="btn btn-primary">
            <i className="bi bi-shop me-2"></i>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Shopping Cart</h1>

      <div className="row">
        {/* Cart Items */}
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              {cartItems.map((item) => (
                <div key={item.product} className="row border-bottom py-3">
                  {/* Product Image */}
                  <div className="col-md-2">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="cart-item-img"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="col-md-4">
                    <h5>{item.name}</h5>
                    <p className="text-primary fw-bold mb-0">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="col-md-3">
                    <label className="form-label small text-muted">
                      Quantity
                    </label>
                    <div className="input-group input-group-sm quantity-input-group">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          handleQuantityChange(item.product, item.quantity - 1)
                        }
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <input
                        type="number"
                        className="form-control text-center"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.product,
                            parseInt(e.target.value) || 1,
                          )
                        }
                        min="1"
                      />
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          handleQuantityChange(item.product, item.quantity + 1)
                        }
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>

                  {/* Subtotal and Remove */}
                  <div className="col-md-3 text-end">
                    <p className="fw-bold mb-2">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRemove(item.product)}
                    >
                      <i className="bi bi-trash me-1"></i>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3">
            <Link to="/products" className="btn btn-outline-primary">
              <i className="bi bi-arrow-left me-2"></i>
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <hr />

              <div className="d-flex justify-content-between mb-2">
                <span>Items ({getTotalItems()})</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span className="text-success">FREE</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-3">
                <strong>Total</strong>
                <strong className="text-primary">
                  {formatPrice(getTotalPrice())}
                </strong>
              </div>

              <div className="d-grid">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                  <i className="bi bi-arrow-right ms-2"></i>
                </button>
              </div>

              <div className="mt-3 p-3 bg-light rounded">
                <small className="text-muted">
                  <i className="bi bi-shield-check text-success me-2"></i>
                  Secure checkout - Your information is safe
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
