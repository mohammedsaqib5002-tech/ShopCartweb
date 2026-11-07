import { useSelector, useDispatch } from "react-redux";
import { removeFromFavorite } from "../Redux/FavoriteSlice";

const Favorites = () => {
  const dispatch = useDispatch();

  const favoriteItems = useSelector(
    (state) => state.favorite.items
  );

  return (
    <div className="max-w-7xl mx-auto p-4">

      <h1 className="text-3xl font-bold mb-6">
        My Favorites ❤️
      </h1>

      {favoriteItems.length === 0 ? (
        <p className="text-gray-500 text-lg">
          No favorite products yet.
        </p>
      ) : (

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">

          {favoriteItems.map((product) => (

            <div
              key={product.id}
              className="min-w-0 border rounded-lg p-3 shadow"
            >

              {/* Product Image */}
              <img
                src={
                  product.thumbnail ||
                  product.images?.[0] ||
                  product.image
                }
                alt={product.title}
                className="w-full h-32 sm:h-48 object-contain"
              />

              {/* Product Name */}
              <h2 className="font-semibold mt-3 text-sm sm:text-base">
                {product.title}
              </h2>

              {/* Price */}
              <p className="font-bold text-green-600 mt-2">
                ${Number(product.price).toFixed(2)}
              </p>

              {/* Rating */}
              <p className="text-yellow-500 mt-1">
                ★ {product.rating?.rate ?? product.rating ?? "N/A"}
              </p>

              {/* Remove Button */}
              <button
                onClick={() =>
                  dispatch(removeFromFavorite(product.id))
                }
                className="bg-[#9F1239] hover:bg-[#881337] text-white px-2 py-2 rounded mt-3 w-full text-sm"
              >
                Remove
              </button>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default Favorites;
