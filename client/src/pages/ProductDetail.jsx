import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";
import Spinner from "../components/common/Spinner";
import ErrorMessage from "../components/common/ErrorMessage";
import SuccessMessage from "../components/common/SuccessMessage";
import { formatPrice } from "../utils/helpers";

/**
 * ProductDetail Page
 * Displays detailed information about a single product
 */

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getProductById(id);
        setProduct(response.data.product);
      } catch (err) {
        setError("Failed to load product details. Please try again.");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setSuccess(
        `Added ${quantity} ${quantity > 1 ? "items" : "item"} to cart!`,
      );
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate("/cart");
    }
  };

  if (loading) {
    return <Spinner message="Loading product details..." />;
  }

  if (error) {
    return (
      <div className="container py-5">
        <ErrorMessage message={error} />
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/products")}
        >
          Back to Products
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h3>Product not found</h3>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/products")}
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Back Button */}
      <button
        className="btn btn-link text-decoration-none mb-3"
        onClick={() => navigate("/products")}
      >
        <i className="bi bi-arrow-left me-2"></i>
        Back to Products
      </button>

      {success && (
        <SuccessMessage message={success} onClose={() => setSuccess("")} />
      )}

      <div className="row">
        {/* Product Image */}
        <div className="col-lg-6 mb-4">
          <div className="card">
            <img
              src={product.imageUrl}
              className="product-detail-img card-img-top p-3"
              alt={product.name}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="col-lg-6">
          <div className="mb-3">
            <span className="badge bg-secondary">{product.category}</span>
          </div>

          <h1 className="fw-bold mb-3">{product.name}</h1>

          <div className="mb-4">
            <h2 className="text-primary">{formatPrice(product.price)}</h2>
          </div>

          {/* Stock Status */}
          <div className="mb-3">
            {product.stock > 0 ? (
              <div className="alert alert-success d-inline-block">
                <i className="bi bi-check-circle me-2"></i>
                In Stock ({product.stock} available)
              </div>
            ) : (
              <div className="alert alert-danger d-inline-block">
                <i className="bi bi-x-circle me-2"></i>
                Out of Stock
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <h5 className="fw-bold">Description</h5>
            <p className="text-muted">{product.description}</p>
          </div>

          {/* Quantity Selector */}
          {product.stock > 0 && (
            <div className="mb-4">
              <label htmlFor="quantity" className="form-label fw-bold">
                Quantity
              </label>
              <select
                id="quantity"
                className="form-select w-auto"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              >
                {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Action Buttons */}
          <div className="d-grid gap-2 d-md-flex">
            <button
              className="btn btn-primary btn-lg"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <i className="bi bi-cart-plus me-2"></i>
              Add to Cart
            </button>
            <button
              className="btn btn-success btn-lg"
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              <i className="bi bi-lightning-fill me-2"></i>
              Buy Now
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-4 p-3 bg-light rounded">
            <h6 className="fw-bold mb-3">Product Information</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <i className="bi bi-tag-fill text-primary me-2"></i>
                Category: {product.category}
              </li>
              <li className="mb-2">
                <i className="bi bi-box-seam text-primary me-2"></i>
                Stock: {product.stock} units
              </li>
              <li className="mb-2">
                <i className="bi bi-shield-check text-primary me-2"></i>
                100% Authentic Products
              </li>
              <li>
                <i className="bi bi-truck text-primary me-2"></i>
                Free Shipping on orders over $50
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
