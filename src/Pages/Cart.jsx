import { useSelector, useDispatch } from "react-Redux";
import { Link, useNavigate } from "react-router-dom";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../Redux/cartSlice.js";
const Cart = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  console.log("CART ITEMS:", cartItems);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Cart 🛒
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-lg">
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="grid gap-6">
            {cartItems.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 shadow flex gap-4"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-32 h-32 object-contain"
                />

                <div className="flex-1">
                  <h2 className="font-semibold text-lg">
                    {product.title}
                  </h2>

                  <p className="font-bold mt-2">
                    ${product.price}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() =>
                        dispatch(decreaseQuantity(product.id))
                      }
                      className="bg-gray-200 px-3 py-1 rounded"
                    >
                      −
                    </button>

                    <span className="font-bold">
                      {product.quantity || 1}
                    </span>

                    <button
                      onClick={() =>
                        dispatch(increaseQuantity(product.id))
                      }
                      className="bg-gray-200 px-3 py-1 rounded"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      dispatch(removeFromCart(product.id))
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded mt-3"
                  >
                    Remove from Cart
                  </button>

                  <p className="font-semibold mt-3">
                    Subtotal: ${(product.price * (product.quantity || 1)).toFixed(2)}
                  </p>           
                </div>
              </div>
            ))}
          </div>

            <div className="mt-8 text-2xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </div>

            <button
              onClick={() => Navigate("/checkout")}
              className="bg-blue-600 text-white px-6 py-3 rounded mt-4"
            >
              Proceed to Checkout
            </button>
        </>
      )}
    </div>
  );
};

export default Cart;

