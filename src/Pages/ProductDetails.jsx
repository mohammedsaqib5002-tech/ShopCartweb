import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.log("Error fetching product:", error);
      });
  }, [id]);

  if (!product) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  const handleAddToCart = () => {
    console.log("PRODUCT BEING ADDED:",product);
    dispatch(addToCart(product));
    alert("Product added to cart!");
  };

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-80 h-80 object-contain"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold">
            {product.title}
          </h1>

          <p className="text-2xl font-bold mt-4">
            ₹{product.price}
          </p>

          <p className="mt-4">
            ⭐ {product.rating}
            ({product.reviews?.length || 0} reviews)
          </p>

          <p className="text-gray-600 mt-6">
            {product.description}
          </p>

          <p className="mt-4">
            <strong>Category:</strong> {product.category}
          </p>

          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-6 py-3 rounded mt-6"
          >
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;