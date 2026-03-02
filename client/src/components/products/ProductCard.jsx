import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/helpers";

/**
 * ProductCard Component
 * Displays a single product with image, details, and add to cart button
 */

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    // Optional: Show toast notification (can be added later)
  };

  return (
    <div className="card h-100 shadow-sm">
      {/* Product Image */}
      <Link to={`/products/${product._id}`} className="text-decoration-none">
        <img
          src={product.imageUrl}
          className="card-img-top"
          alt={product.name}
        />
      </Link>

      <div className="card-body d-flex flex-column">
        {/* Category Badge */}
        <div className="mb-2">
          <span className="badge bg-secondary">{product.category}</span>
        </div>

        {/* Product Name */}
        <Link
          to={`/products/${product._id}`}
          className="text-decoration-none text-dark"
        >
          <h5 className="card-title">{product.name}</h5>
        </Link>

        {/* Product Description */}
        <p className="card-text text-muted small flex-grow-1">
          {product.description.substring(0, 80)}...
        </p>

        {/* Price and Stock */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="text-primary mb-0">{formatPrice(product.price)}</h4>
          {product.stock > 0 ? (
            <span className="badge bg-success">In Stock</span>
          ) : (
            <span className="badge bg-danger">Out of Stock</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="d-grid gap-2">
          <button
            className="btn btn-primary"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <i className="bi bi-cart-plus me-2"></i>
            Add to Cart
          </button>
          <Link
            to={`/products/${product._id}`}
            className="btn btn-outline-secondary btn-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
