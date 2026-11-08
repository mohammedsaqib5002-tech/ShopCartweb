import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard";

function Products({ category: categoryProp }) {
  const { category: urlCategory } = useParams();
  const category = categoryProp || urlCategory || "";

  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [localSearch, setLocalSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 12;

  // Fetch products from DummyJSON
  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://dummyjson.com/products?limit=194",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching products:", err);
          setError("Unable to load products. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <h2 className="text-center mt-10 text-xl font-semibold">
        Loading products...
      </h2>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  const searchText = `${urlSearch} ${localSearch}`.toLowerCase().trim();

  // Filter products
  const filteredProducts = products.filter((product) => {
    const productCategory = product.category?.toLowerCase() || "";

    const matchesSearch =
      !searchText ||
      product.title?.toLowerCase().includes(searchText) ||
      product.brand?.toLowerCase().includes(searchText) ||
      productCategory.includes(searchText);

    const matchesPrice =
      maxPrice === "" || product.price <= Number(maxPrice);

    const routeCategory = category.toLowerCase();

    const matchesRouteCategory =
      !routeCategory ||
      routeCategory === "all" ||
      routeCategory === "all categories" ||
      productCategory === routeCategory;

    const matchesSelectedCategory =
      selectedCategory === "All" ||
      productCategory === selectedCategory.toLowerCase();

    return (
      matchesSearch &&
      matchesPrice &&
      matchesRouteCategory &&
      matchesSelectedCategory
    );
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "low-high") return a.price - b.price;
    if (sortBy === "high-low") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(
    sortedProducts.length / productsPerPage
  );

  const startIndex = (currentPage - 1) * productsPerPage;

  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        {category
          ? category.replaceAll("-", " ")
          : "All Products"}
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={localSearch}
        onChange={(e) => {
          setLocalSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="w-full border p-3 rounded-lg mb-6"
      />

      {/* Category filter */}
      <select
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          setCurrentPage(1);
        }}
        className="w-full border p-3 rounded-lg mb-6"
      >
        <option value="All">All Categories</option>
        <option value="beauty">Beauty</option>
        <option value="fragrances">Fragrances</option>
        <option value="furniture">Furniture</option>
        <option value="groceries">Groceries</option>
        <option value="home-decoration">Home Decoration</option>
        <option value="kitchen-accessories">Kitchen Accessories</option>
        <option value="laptops">Laptops</option>
        <option value="mens-shirts">Men's Shirts</option>
        <option value="mens-shoes">Men's Shoes</option>
        <option value="mens-watches">Men's Watches</option>
        <option value="mobile-accessories">Mobile Accessories</option>
        <option value="motorcycle">Motorcycle</option>
        <option value="skin-care">Skin Care</option>
        <option value="smartphones">Smartphones</option>
        <option value="sports-accessories">Sports Accessories</option>
        <option value="sunglasses">Sunglasses</option>
        <option value="tablets">Tablets</option>
        <option value="tops">Tops</option>
        <option value="vehicle">Vehicle</option>
        <option value="womens-bags">Women's Bags</option>
        <option value="womens-dresses">Women's Dresses</option>
        <option value="womens-jewellery">Women's Jewellery</option>
        <option value="womens-shoes">Women's Shoes</option>
        <option value="womens-watches">Women's Watches</option>
      </select>

      {/* Sorting and price filter */}
      <div className="mb-6 flex items-center gap-3 flex-wrap">
        <label htmlFor="sortProducts" className="font-semibold">
          Sort by:
        </label>

        <select
          id="sortProducts"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
        >
          <option value="default">Default</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>

        <label className="flex items-center gap-2">
          <span className="font-semibold">Max price:</span>
          <input
            type="number"
            min="0"
            placeholder="Enter price"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              setCurrentPage(1);
            }}
            className="w-32 border border-gray-300 rounded-lg px-3 py-2"
          />
        </label>

        <button
          onClick={() => {
            setLocalSearch("");
            setSelectedCategory("All");
            setMaxPrice("");
            setSortBy("default");
            setCurrentPage(1);
          }}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
        >
          Clear Filters
        </button>
      </div>

      <p className="mb-4 text-gray-600">
        Showing {sortedProducts.length} products
      </p>

      {/* Product list */}
      {currentProducts.length > 0 ? (
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-10">
          No products found. Try changing your filters.
        </p>
      )}

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() =>
              setCurrentPage((page) => Math.max(page - 1, 1))
            }
            disabled={currentPage === 1}
            className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((page) =>
                Math.min(page + 1, totalPages)
              )
            }
            disabled={currentPage === totalPages}
            className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Products;