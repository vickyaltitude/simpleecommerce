import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";
import ErrorMessage from "../components/common/ErrorMessage";
import { formatPrice } from "../utils/helpers";

/**
 * Checkout Page
 * Allows users to enter shipping address and place order
 */

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate address
    if (
      !shippingAddress.street ||
      !shippingAddress.city ||
      !shippingAddress.postalCode ||
      !shippingAddress.country
    ) {
      setError("Please fill in all address fields");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        items: cartItems,
        totalAmount: getTotalPrice(),
        shippingAddress,
      };

      const response = await createOrder(orderData);

      if (response.data.success) {
        clearCart();
        navigate(`/orders/${response.data.order._id}`, {
          state: { orderPlaced: true },
        });
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to place order. Please try again.",
      );
      console.error("Order error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Checkout</h1>

      {error && <ErrorMessage message={error} onClose={() => setError("")} />}

      <div className="row">
        {/* Shipping Form */}
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4">
                <i className="bi bi-truck me-2"></i>
                Shipping Address
              </h5>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="street" className="form-label">
                    Street Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="street"
                    name="street"
                    value={shippingAddress.street}
                    onChange={handleChange}
                    placeholder="123 Main Street"
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleChange}
                      placeholder="New York"
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="postalCode" className="form-label">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="postalCode"
                      name="postalCode"
                      value={shippingAddress.postalCode}
                      onChange={handleChange}
                      placeholder="10001"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="country"
                    name="country"
                    value={shippingAddress.country}
                    onChange={handleChange}
                    placeholder="United States"
                    required
                  />
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/cart")}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Cart
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Placing Order...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Place Order
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <hr />

              {/* Cart Items */}
              <div
                className="mb-3"
                style={{ maxHeight: "200px", overflowY: "auto" }}
              >
                {cartItems.map((item) => (
                  <div
                    key={item.product}
                    className="d-flex justify-content-between mb-2"
                  >
                    <div>
                      <small>{item.name}</small>
                      <br />
                      <small className="text-muted">Qty: {item.quantity}</small>
                    </div>
                    <small>{formatPrice(item.price * item.quantity)}</small>
                  </div>
                ))}
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span className="text-success">FREE</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-0">
                <strong>Total</strong>
                <strong className="text-primary">
                  {formatPrice(getTotalPrice())}
                </strong>
              </div>
            </div>
          </div>

          <div className="alert alert-info mt-3">
            <small>
              <i className="bi bi-info-circle me-2"></i>
              By placing this order, you agree to our terms and conditions.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
