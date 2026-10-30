import { useEffect, useState } from "react";
import { useSearchParams, useParams} from "react-router-dom";
import ProductCard from "../Components/ProductCard";

function Products({ category: categoryProp }){
  const { category: urlCategory } = useParams();
  const category = categoryProp || urlCategory;
  const [searchParams] = useSearchParams();
    console.log("CATEGORY FROM URL:", category);
  const search = searchParams.get("search") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("deault");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

   useEffect(()  => {
    setCurrentPage(1);
  }, [search, category, maxPrice, sortBy]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

          let url = "https://dummyjson.com/products?limit=194";

if (
  category === "mens-shirts" ||
  category === "womens-dresses" ||
  category === "womens-jewellery"
) {
  url = "https://dummyjson.com/products?limit=194";
} else if (
  category &&
  category !== "all" &&
  category !== "All Categories"
) {
  url = `https://dummyjson.com/products/category/${category}`;
}
        console.log("FetcCHING URL:", url);
        const response = await fetch(url);
        
        console.log("RESPONCE STATUS:", responce.status);
        console.log("CONTENT TYPE:", responce.headers.get("content-type"));

        if (!responce.ok){
          throw new ERROR(`API Error: ${responce.status}`);
        }

        const data = await response.json();
        
        setProducts(data.products || []);

        console.log("API responce:", data);
        console.log("Products recieved:",data.products?.length);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, search]);

  if (loading) {
    return <h2 className="text-center mt-10">Loading products...</h2>;
  }

  const filteredProducts = products.filter((product) => {
   const searchText = search.toLowerCase().trim();

const matchesSearch =
  product.title?.toLowerCase().includes(searchText) ||
  product.brand?.toLowerCase().includes(searchText) ||
  product.category?.toLowerCase().includes(searchText);

  const matchesPrice = 
  maxPrice === "" || product.price <= Number(maxPrice);

 const matchesCategory =
  (selectedCategory === "All" ||
   selectedCategory === "All Categories") || 
  product.category?.toLowerCase() ===
    selectedCategory.toLowerCase() ||
  (selectedCategory === "mens-shirts" &&
    ["mens-shirts", "mens-shoes", "mens-watches"].includes(
      product.category?.toLowerCase()
    )) ||
  (selectedCategory === "womens-dresses" &&
    ["womens-dresses", "womens-bags", "womens-shoes", "womens-watches"].includes(
      product.category?.toLowerCase()
    ));
return matchesSearch && matchesPrice && matchesCategory;
});

  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
  if (sortBy === "low-high") return a.price - b.price;
  if (sortBy === "high-low") return b.price - a.price;
  if (sortBy === "rating") {
    return (b.rating?.rate || b.rating || 0) -
           (a.rating?.rate || a.rating || 0);
  }
  return 0;
});

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
      <select
  value={selectedCategory}
  onChange={(e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  }}
  className="w-full border p-3 rounded-lg mb-4"
>
  <option value="All">All Categories</option>
  <option value="beauty">Beauty</option>
  <option value="fragrances">Fragrances</option>
  <option value="furniture">Furniture</option>
  <option value="groceries">Groceries</option>
  <option value="mens-shirts">Men's Shirts</option>
  <option value="mens-shoes">Men's Shoes</option>
  <option value="mens-watches">Men's Watches</option>
  <option value="womens-dresses">Women's Dresses</option>
  <option value="womens-jewellery">Women's Jewellery</option>
  <option value="womens-shoes">Women's Shoes</option>
  <option value="womens-watches">Women's Watches</option>
</select>
      <input 
        type="text"
        placeholder="Search products.."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)}
          className="w-full border p-3 rounded-lg mb-6"
          />

      <h1 className="text-2xl font-bold mb-6">
        {category ? category : "All Products"}
      </h1>

      <div className="mb-6 flex items-center gap-3 flex-wrap">
  <label htmlFor="sortProducts" className="font-semibold">
    Sort by:
  </label>

  <select
    id="sortProducts"
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
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
    onChange={(e) => setMaxPrice(e.target.value)}
    className="w-32 border border-gray-300 rounded-lg px-3 py-2"
  />
</label>

<button
  onClick={() => {
    setMaxPrice("");
    setSearch("");
    setSortBy("default");
    setCurrentPage(1);
  }}
  className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
>
  Clear Filters
</button>
</div>
      <p className="mb-4 text-gray-600"> Showing {sortedProducts.length} products</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

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
    disabled={currentPage === totalPages || totalPages === 0}
    className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
  >
    Next
  </button>
</div>
    </div>
  );
}

export default Products;
