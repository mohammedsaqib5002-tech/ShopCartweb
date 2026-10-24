import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice";
import { useSelector } from "react-redux";
import {
  addToFavorite,
  removeFromFavorite,
} from "../Redux/FavoriteSlice";

const ProductCard = ({ product }) => {
  const discount = Math.round(product.discountPercentage || 0);
  const originalPrice = discount > 0
  ? (product.price / (1 - discount / 100)).toFixed(2)
  : null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoriteItems = useSelector(
    (state) => state.favorite.items
  );

  const isFavoriteItems = favoriteItems.some(
    (items) => items.id === product.id 
  );

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

    if(isFavoriteItems){
      dispatch(removeFromFavorite(product.id));
    }else{
      dispatch(addToFavorite(product));
    }
  };

  return (
    <div
      onClick={handleProductClick}
      className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
    >
     <div className="relative">
  <img
    src={product.thumbnail}
    alt={product.title}
    className="w-full h-48 object-contain"
  />

  {discount > 0 && (
    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
      {discount}% OFF
    </span>
  )}
</div>

      <h2 className="font-semibold mt-4 line-clamp-2">
        {product.title}
      </h2>

      <div className="flex items-center gap-1 mt-2 text-sm">
  <span className="text-yellow-500">★</span>
  <span>{product.rating?.rate ?? product.rating ?? "N/A"}</span>
  <span className="text-gray-500">
    ({product.rating?.count ?? 0} reviews)
  </span>
</div>

      <div className="flex items-center gap-2 mt-2 flex-wrap">
  <p className="text-lg font-bold text-green-700">
    ${Number(product.price).toFixed(2)}
  </p>

  {originalPrice && (
    <p className="text-sm text-gray-500 line-through">
      ${originalPrice}
    </p>
  )}
</div>
      
      <button
  onClick={handleAddToCart}
  disabled={product.stock <= 0}
  className={`text-white px-4 py-2 rounded mt-3 ${
    product.stock <= 0
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
  }`}
>
  {isFavoriteItems ? "❤️" : "🤍"}
</button>

<p
  className={`text-sm font-medium ${
    product.stock > 0
      ? "text-green-600"
      : "text-red-600"
  }`}
>
  {product.stock > 0 ? "In Stock" : "Out of Stock"}
</p>

      <button
  onClick={handleAddToCart}
  className="bg-blue-600 text-white px-4 py-2 rounded mt-3"
>
  Add to Cart
</button>

    </div>
  );
};

export default ProductCard;