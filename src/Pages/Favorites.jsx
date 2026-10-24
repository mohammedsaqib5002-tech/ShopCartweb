import { useSelector, useDispatch } from "react-redux";
import { removeFromFavorite } from "../Redux/FavoriteSlice";

const Favorites = () => {
  const dispatch = useDispatch();

  const favoriteItems = useSelector(
    (state) => state.favorite.items
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Favorites ❤️
      </h1>

      {favoriteItems.length === 0 ? (
        <p className="text-gray-500 text-lg">
          No favorite products yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {favoriteItems.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain"
              />

              <h2 className="font-semibold mt-3 line-clamp-2">
                {product.title}
              </h2>

              <p className="font-bold mt-2">
                ${product.price}
              </p>

              <button
                onClick={() =>
                  dispatch(removeFromFavorite(product.id))
                }
                className="bg-red-500 text-white px-4 py-2 rounded mt-3"
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;