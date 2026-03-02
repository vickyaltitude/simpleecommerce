import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";
import ProductCard from "../components/products/ProductCard";
import Spinner from "../components/common/Spinner";

/**
 * Home Page
 * Landing page with hero section and featured products
 */

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await getAllProducts();
        // Show first 4 products as featured
        setFeaturedProducts(response.data.products.slice(0, 4));
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Welcome to Simple E-Shop
              </h1>
              <p className="lead mb-4">
                Discover amazing products at great prices. From electronics to
                books, we have everything you need in one place.
              </p>
              <div className="d-flex gap-3">
                <Link to="/products" className="btn btn-light btn-lg">
                  <i className="bi bi-shop me-2"></i>
                  Shop Now
                </Link>
                <Link to="/register" className="btn btn-outline-light btn-lg">
                  Sign Up
                </Link>
              </div>
            </div>
            <div className="col-lg-6 mt-4 mt-lg-0 text-center">
              <i className="bi bi-cart-check display-1"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4 text-center">
              <div className="feature-box p-4">
                <i className="bi bi-truck display-4 text-primary mb-3"></i>
                <h4>Free Shipping</h4>
                <p className="text-muted">On orders over $50</p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="feature-box p-4">
                <i className="bi bi-shield-check display-4 text-primary mb-3"></i>
                <h4>Secure Checkout</h4>
                <p className="text-muted">100% secure payment</p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="feature-box p-4">
                <i className="bi bi-headset display-4 text-primary mb-3"></i>
                <h4>24/7 Support</h4>
                <p className="text-muted">Dedicated support team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Featured Products</h2>
            <p className="text-muted">Check out our most popular items</p>
          </div>

          {loading ? (
            <Spinner message="Loading featured products..." />
          ) : (
            <>
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {featuredProducts.map((product) => (
                  <div key={product._id} className="col">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              <div className="text-center mt-4">
                <Link to="/products" className="btn btn-primary btn-lg">
                  View All Products
                  <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-dark text-white">
        <div className="container text-center">
          <h3 className="mb-3">Ready to start shopping?</h3>
          <p className="lead mb-4">
            Join thousands of satisfied customers today!
          </p>
          <Link to="/register" className="btn btn-light btn-lg">
            Create Your Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
