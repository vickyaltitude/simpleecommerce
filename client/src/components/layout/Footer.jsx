/**
 * Footer Component
 * Simple footer with copyright and social links
 */

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white mt-5">
      <div className="container py-4">
        <div className="row">
          {/* About Section */}
          <div className="col-md-4 mb-3">
            <h5 className="mb-3">
              <i className="bi bi-shop me-2"></i>
              Simple E-Shop
            </h5>
            <p className="text-muted small">
              Your one-stop shop for quality products. From electronics to
              books, we've got everything you need.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h6 className="mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="/products"
                  className="text-muted text-decoration-none small"
                >
                  <i className="bi bi-chevron-right"></i> Shop All Products
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/cart"
                  className="text-muted text-decoration-none small"
                >
                  <i className="bi bi-chevron-right"></i> Shopping Cart
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/orders"
                  className="text-muted text-decoration-none small"
                >
                  <i className="bi bi-chevron-right"></i> My Orders
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-3">
            <h6 className="mb-3">Connect With Us</h6>
            <div className="d-flex gap-3">
              <a href="#" className="text-muted" aria-label="Facebook">
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a href="#" className="text-muted" aria-label="Twitter">
                <i className="bi bi-twitter fs-4"></i>
              </a>
              <a href="#" className="text-muted" aria-label="Instagram">
                <i className="bi bi-instagram fs-4"></i>
              </a>
              <a href="#" className="text-muted" aria-label="LinkedIn">
                <i className="bi bi-linkedin fs-4"></i>
              </a>
            </div>
            <p className="text-muted small mt-3 mb-0">
              <i className="bi bi-envelope me-2"></i>
              support@simpleshop.com
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-top border-secondary pt-3 mt-3">
          <p className="text-center text-muted small mb-0">
            &copy; {currentYear} Simple E-Shop. Built with MERN Stack for
            educational purposes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
