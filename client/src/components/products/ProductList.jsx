import ProductCard from "./ProductCard";

/**
 * ProductList Component
 * Displays a grid of products using ProductCard components
 */

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-inbox display-1 text-muted"></i>
        <h3 className="mt-3">No products found</h3>
        <p className="text-muted">
          Try adjusting your filters or check back later for new products.
        </p>
      </div>
    );
  }

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
      {products.map((product) => (
        <div key={product._id} className="col">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
