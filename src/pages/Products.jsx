import { useState, useEffect, useRef, useCallback } from "react";
import { fetchProducts } from "../api/products";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);

  const observer = useRef();
  const skipRef = useRef(0);
  const loadingRef = useRef(false);
  const initialLoadRef = useRef(false);
  const limit = 10;

  const loadProducts = async (currentSkip) => {
    if (loadingRef.current) return;

    loadingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const data = await fetchProducts(limit, currentSkip);

      setProducts((prev) => [...prev, ...data.products]);
      setHasMore(currentSkip + limit < data.total);
      const newSkip = currentSkip + limit;
      setSkip(newSkip);
      skipRef.current = newSkip;
    } catch (err) {
      setError("Failed to load products. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  };

  useEffect(() => {
    if (!initialLoadRef.current) {
      initialLoadRef.current = true;
      loadProducts(0);
    }
  }, []);

  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadProducts(skipRef.current);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Products</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => {
            if (products.length === index + 1) {
              return (
                <div ref={lastProductRef} key={product.id}>
                  <ProductCard product={product} />
                </div>
              );
            } else {
              return <ProductCard key={product.id} product={product} />;
            }
          })}
        </div>

        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {!hasMore && products.length > 0 && (
          <div className="text-center py-8 text-gray-600">
            You've reached the end of the products list
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
