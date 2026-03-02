import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getOrderById } from "../services/orderService";
import Spinner from "../components/common/Spinner";
import ErrorMessage from "../components/common/ErrorMessage";
import SuccessMessage from "../components/common/SuccessMessage";
import { formatPrice, formatDate } from "../utils/helpers";

/**
 * OrderDetail Page
 * Displays detailed information about a single order
 */

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getOrderById(id);
        setOrder(response.data.order);
      } catch (err) {
        setError("Failed to load order details. Please try again.");
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();

    // Show success message if coming from checkout
    if (location.state?.orderPlaced) {
      setShowSuccess(true);
      // Clear the state
      window.history.replaceState({}, document.title);
    }
  }, [id, location.state]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-warning";
      case "Confirmed":
        return "bg-info";
      case "Delivered":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  if (loading) {
    return <Spinner message="Loading order details..." />;
  }

  if (error) {
    return (
      <div className="container py-5">
        <ErrorMessage message={error} />
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/orders")}
        >
          Back to Orders
        </button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container py-5 text-center">
        <h3>Order not found</h3>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/orders")}
        >
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Success Message */}
      {showSuccess && (
        <SuccessMessage
          message="🎉 Order placed successfully! Thank you for your purchase."
          onClose={() => setShowSuccess(false)}
        />
      )}

      {/* Back Button */}
      <button
        className="btn btn-link text-decoration-none mb-3"
        onClick={() => navigate("/orders")}
      >
        <i className="bi bi-arrow-left me-2"></i>
        Back to Orders
      </button>

      <div className="row">
        {/* Order Details */}
        <div className="col-lg-8">
          {/* Order Header */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h4 className="mb-2">Order #{order._id.substring(0, 12)}</h4>
                  <p className="text-muted mb-0">
                    <i className="bi bi-calendar me-2"></i>
                    Placed on {formatDate(order.createdAt)}
                  </p>
                </div>
                <span
                  className={`badge ${getStatusBadgeClass(order.status)} fs-6`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4">Order Items</h5>

              {order.items.map((item, index) => (
                <div key={index} className="row border-bottom py-3">
                  <div className="col-md-2">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <h6>{item.name}</h6>
                    <p className="text-muted mb-0">Quantity: {item.quantity}</p>
                  </div>
                  <div className="col-md-4 text-end">
                    <p className="fw-bold mb-0">{formatPrice(item.price)}</p>
                    <p className="text-muted small mb-0">
                      Subtotal: {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">
                <i className="bi bi-truck me-2"></i>
                Shipping Address
              </h5>
              <address>
                {order.shippingAddress.street}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                <br />
                {order.shippingAddress.country}
              </address>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Order Summary</h5>

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>{formatPrice(order.totalAmount)}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span className="text-success">FREE</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong className="text-primary">
                  {formatPrice(order.totalAmount)}
                </strong>
              </div>

              <div className="alert alert-info mb-0">
                <small>
                  <i className="bi bi-info-circle me-2"></i>
                  You will receive an email confirmation shortly.
                </small>
              </div>
            </div>
          </div>

          {/* Continue Shopping */}
          <div className="d-grid mt-3">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/products")}
            >
              <i className="bi bi-shop me-2"></i>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
