import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
 const [category, setCategory ] = useState("all");

useEffect(() => {
  const url =
  category === "all"
    ?
 "https://dummyjson.com/products?limit=194":
  `https://dummyjson.com/products/category/${category}`;
       console.log("Fetching products:", url);
  
       fetch(url)
    .then((response) => {
    if (!response.ok){
      throw new Error("Failed to fetch products");
    }
      return response.json();
    })
  .then((data) => {
    setProducts(data.products || []);
  })
  .catch((error) => {
    console.error("Error fetching products:",error);
    setProducts([]);
  });
}, [category]);

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold text-center mb-8">
        Our Products
      </h1>

<div className="flex flex-wrap justify-center gap-4 mb-8">

  <button
    onClick={() =>setCategory("all")}
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    All
  </button>

  <button
    onClick={() => setCategory("men's clothing")}
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    Men's Clothing
  </button>

  <button
    onClick={() => setCategory("women's clothing")}
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    Women's Clothing
  </button>

  <button
    onClick={() => setCategory("jewelery")}
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    Jewelery
  </button>

  <button
    onClick={() => setCategory("electronics")}
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    Electronics
  </button>

</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products.map((product) => (
          <ProductCard key={product.id}
          product={product} />
        ))}
        
        </div>

      </div>
  );
}

export default Home;
