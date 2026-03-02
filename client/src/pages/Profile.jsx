import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Profile Page
 * Displays user profile information
 */

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="container py-4">
      <h1 className="mb-4">My Profile</h1>

      <div className="row">
        <div className="col-lg-8">
          {/* Profile Information */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="text-center mb-4">
                <div
                  className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center"
                  style={{
                    width: "100px",
                    height: "100px",
                    fontSize: "2.5rem",
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </div>

              <h5 className="card-title mb-4">Account Information</h5>

              <div className="row mb-3">
                <div className="col-md-4">
                  <strong>Full Name</strong>
                </div>
                <div className="col-md-8">{user?.name}</div>
              </div>

              <div className="row mb-3">
                <div className="col-md-4">
                  <strong>Email Address</strong>
                </div>
                <div className="col-md-8">{user?.email}</div>
              </div>

              <div className="row mb-3">
                <div className="col-md-4">
                  <strong>Account ID</strong>
                </div>
                <div className="col-md-8">
                  <code>{user?.id}</code>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Quick Actions</h5>

              <div className="list-group list-group-flush">
                <Link
                  to="/orders"
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                >
                  <div>
                    <i className="bi bi-bag-check me-3 text-primary"></i>
                    <strong>My Orders</strong>
                    <p className="mb-0 small text-muted">
                      View your order history
                    </p>
                  </div>
                  <i className="bi bi-chevron-right"></i>
                </Link>

                <Link
                  to="/cart"
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                >
                  <div>
                    <i className="bi bi-cart me-3 text-primary"></i>
                    <strong>Shopping Cart</strong>
                    <p className="mb-0 small text-muted">
                      View items in your cart
                    </p>
                  </div>
                  <i className="bi bi-chevron-right"></i>
                </Link>

                <Link
                  to="/products"
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                >
                  <div>
                    <i className="bi bi-shop me-3 text-primary"></i>
                    <strong>Browse Products</strong>
                    <p className="mb-0 small text-muted">Continue shopping</p>
                  </div>
                  <i className="bi bi-chevron-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body text-center">
              <i className="bi bi-shield-check display-4 text-success mb-3"></i>
              <h5>Account Secure</h5>
              <p className="text-muted small mb-0">
                Your account and data are protected with industry-standard
                security.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Account Tips</h6>
              <ul className="list-unstyled mb-0 small">
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Keep your email updated
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Check orders regularly
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Save items to cart for later
                </li>
                <li>
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Browse new arrivals weekly
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
