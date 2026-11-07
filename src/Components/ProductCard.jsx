import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../Redux/cartSlice";

import {
  addToFavorite,
  removeFromFavorite,
} from "../Redux/FavoriteSlice";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const favoriteItems = useSelector(
    (state) => state.favorite.items
  );

  const isFavorite = favoriteItems.some(
    (item) => item.id === product.id
  );

  const discount = Math.round(
    product.discountPercentage || 0
  );

  const originalPrice =
    discount > 0
      ? (product.price / (1 - discount / 100)).toFixed(2)
      : null;

  const handleProductClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (product.stock <= 0) {
      alert("Sorry, this product is out of stock!");
      return;
    }

    dispatch(addToCart(product));
    alert("Product added to cart!");
  };

  const handleFavorite = (e) => {
    e.stopPropagation();

    if (isFavorite) {
      dispatch(removeFromFavorite(product.id));
    } else {
      dispatch(addToFavorite(product));
    }
  };

  return (
    <div
      onClick={handleProductClick}
      className="min-w-0 w-full overflow-hidden border rounded-lg p-2 sm:p-3 shadow hover:shadow-lg transition cursor-pointer"
    >

      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-24 sm:h-36 md:h-48 object-contain"
        />

        {discount > 0 && (
          <span className="absolute top-1 left-1 bg-red-600 text-white text-[9px] sm:text-xs font-bold px-1 sm:px-2 py-1 rounded">
            {discount}% OFF
          </span>
        )}
      </div>

      <h2 className="font-semibold text-xs sm:text-sm mt-2 line-clamp-2">
        {product.title}
      </h2>

      <div className="flex flex-wrap items-center gap-1 mt-2 text-[10px] sm:text-sm">
        <span className="text-yellow-500">★</span>
        <span>
          {product.rating?.rate ?? product.rating ?? "N/A"}
        </span>
        <span className="text-gray-500">
          ({product.rating?.count ?? 0})
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1 mt-2">
        <p className="text-sm sm:text-lg font-bold text-green-700">
          ${Number(product.price).toFixed(2)}
        </p>

        {originalPrice && (
          <p className="text-[10px] sm:text-sm text-gray-500 line-through">
            ${originalPrice}
          </p>
        )}
      </div>

      <button
        onClick={handleFavorite}
        className="bg-[#9F1239] text-white px-2 py-1 rounded mt-2 text-xs sm:text-sm"
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      <p
        className={`text-[10px] sm:text-sm font-medium mt-1 ${
          product.stock > 0
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {product.stock > 0 ? "In Stock" : "Out of Stock"}
      </p>

      <button
        onClick={handleAddToCart}
        disabled={product.stock <= 0}
        className={`w-full text-white px-1 sm:px-2 py-2 rounded mt-2 text-[10px] sm:text-sm ${
          product.stock <= 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#9F1239] hover:bg-[#881337]"
        }`}
      >
        Add to Cart
      </button>

    </div>
  );
};

export default ProductCard;
