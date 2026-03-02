import { useEffect, useState } from "react";
import { getAllProducts, getCategories } from "../services/productService";
import ProductList from "../components/products/ProductList";
import Spinner from "../components/common/Spinner";
import ErrorMessage from "../components/common/ErrorMessage";

/**
 * Products Page
 * Displays all products with category filter and search
 */

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = getCategories();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      let filtered = [...products];

      // Filter by category
      if (selectedCategory) {
        filtered = filtered.filter(
          (product) => product.category === selectedCategory,
        );
      }

      // Filter by search query
      if (searchQuery) {
        filtered = filtered.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()),
        );
      }

      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [selectedCategory, searchQuery, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getAllProducts();
      setProducts(response.data.products);
      setFilteredProducts(response.data.products);
    } catch (err) {
      setError("Failed to load products. Please try again.");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSearchQuery("");
  };

  return (
    <div className="container py-4">
      {/* Page Header */}
      <div className="mb-4">
        <h1 className="fw-bold">All Products</h1>
        <p className="text-muted">Browse our complete collection</p>
      </div>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-8">
          {/* Search Bar */}
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="col-md-4 mt-2 mt-md-0">
          {/* Category Filter */}
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters */}
      {(selectedCategory || searchQuery) && (
        <div className="mb-3">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <span className="text-muted">Active filters:</span>
            {selectedCategory && (
              <span className="badge bg-primary">
                {selectedCategory}
                <button
                  className="btn-close btn-close-white ms-2"
                  style={{ fontSize: "0.7rem" }}
                  onClick={() => setSelectedCategory("")}
                  aria-label="Remove category filter"
                ></button>
              </span>
            )}
            {searchQuery && (
              <span className="badge bg-primary">
                Search: "{searchQuery}"
                <button
                  className="btn-close btn-close-white ms-2"
                  style={{ fontSize: "0.7rem" }}
                  onClick={() => setSearchQuery("")}
                  aria-label="Remove search filter"
                ></button>
              </span>
            )}
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={clearFilters}
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="mb-3">
        <p className="text-muted">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>

      {/* Error Message */}
      {error && <ErrorMessage message={error} onClose={() => setError("")} />}

      {/* Products List */}
      {loading ? (
        <Spinner message="Loading products..." />
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </div>
  );
};

export default Products;
