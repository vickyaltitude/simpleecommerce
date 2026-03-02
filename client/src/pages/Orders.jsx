import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserOrders } from "../services/orderService";
import Spinner from "../components/common/Spinner";
import ErrorMessage from "../components/common/ErrorMessage";
import { formatPrice, formatDate } from "../utils/helpers";

/**
 * Orders Page
 * Displays list of user's orders
 */

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getUserOrders();
      setOrders(response.data.orders);
    } catch (err) {
      setError("Failed to load orders. Please try again.");
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

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
    return <Spinner message="Loading your orders..." />;
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">My Orders</h1>

      {error && <ErrorMessage message={error} onClose={() => setError("")} />}

      {orders.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-bag-x display-1 text-muted"></i>
          <h3 className="mt-3">No orders yet</h3>
          <p className="text-muted mb-4">
            You haven't placed any orders. Start shopping now!
          </p>
          <Link to="/products" className="btn btn-primary">
            <i className="bi bi-shop me-2"></i>
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div key={order._id} className="col-12 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    {/* Order Info */}
                    <div className="col-md-6">
                      <h5 className="card-title">
                        Order #{order._id.substring(0, 8)}
                      </h5>
                      <p className="text-muted mb-2">
                        <i className="bi bi-calendar me-2"></i>
                        {formatDate(order.createdAt)}
                      </p>
                      <p className="mb-2">
                        <span
                          className={`badge ${getStatusBadgeClass(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </p>
                    </div>

                    {/* Order Summary */}
                    <div className="col-md-3">
                      <p className="text-muted mb-1">Items</p>
                      <p className="fw-bold">{order.items.length}</p>
                      <p className="text-muted mb-1">Total</p>
                      <p className="fw-bold text-primary">
                        {formatPrice(order.totalAmount)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="col-md-3 text-end">
                      <Link
                        to={`/orders/${order._id}`}
                        className="btn btn-primary"
                      >
                        View Details
                        <i className="bi bi-arrow-right ms-2"></i>
                      </Link>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <hr />
                  <div className="d-flex gap-2 flex-wrap">
                    {order.items.slice(0, 3).map((item, index) => (
                      <img
                        key={index}
                        src={item.imageUrl}
                        alt={item.name}
                        className="rounded"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                      />
                    ))}
                    {order.items.length > 3 && (
                      <div
                        className="d-flex align-items-center justify-content-center bg-light rounded"
                        style={{ width: "60px", height: "60px" }}
                      >
                        <small className="text-muted">
                          +{order.items.length - 3}
                        </small>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
