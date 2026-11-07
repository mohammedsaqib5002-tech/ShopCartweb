import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../Redux/cartSlice.js";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * (item.quantity || 1),
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        My Cart 🛒
      </h1>

      {cartItems.length === 0 ? (

        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">
            Your cart is empty!
          </h2>

          <p className="text-gray-500 mt-2">
            Add some products to your shopping cart.
          </p>

          <Link
            to="/products"
            className="inline-block bg-[#9F1239] text-white px-6 py-3 rounded-lg mt-5 hover:bg-[#881337]"
          >
            Continue Shopping
          </Link>
        </div>

      ) : (

        <div className="flex flex-col gap-5">

          {/* Cart Products */}
          <div className="flex flex-col gap-4">

            {cartItems.map((product) => (

              <div
                key={product.id}
                className="border rounded-xl shadow-sm p-3 sm:p-4 flex items-start gap-3 sm:gap-5"
              >

                {/* Product Image */}
                <img
                  src={
                    product.thumbnail ||
                    product.images?.[0]
                  }
                  alt={product.title}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-contain shrink-0"
                />

                {/* Product Details */}
                <div className="flex-1 min-w-0">

                  <h2 className="font-semibold text-sm sm:text-lg break-words">
                    {product.title}
                  </h2>

                  <p className="text-green-700 font-bold mt-2">
                    ${Number(product.price).toFixed(2)}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-3">

                    <button
                      onClick={() =>
                        dispatch(decreaseQuantity(product.id))
                      }
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded font-bold"
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
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded font-bold"
                    >
                      +
                    </button>

                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() =>
                      dispatch(removeFromCart(product.id))
                    }
                    className="bg-[#9F1239] hover:bg-[#881337] text-white px-3 py-2 rounded mt-3 text-xs sm:text-sm"
                  >
                    Remove from Cart
                  </button>

                  {/* Subtotal */}
                  <p className="font-semibold mt-3 text-sm">
                    Subtotal: $
                    {(
                      product.price *
                      (product.quantity || 1)
                    ).toFixed(2)}
                  </p>

                </div>

              </div>

            ))}

          </div>

          {/* Order Summary */}
          <div className="border rounded-xl shadow-sm p-4 sm:p-6">

            <h2 className="text-xl font-bold mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between text-gray-600 mb-3">
              <span>Total Products</span>
              <span>
                {cartItems.reduce(
                  (sum, item) => sum + (item.quantity || 1),
                  0
                )}
              </span>
            </div>

            <div className="flex justify-between font-bold text-xl border-t pt-4">
              <span>Total Amount</span>
              <span className="text-green-700">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-[#9F1239] hover:bg-[#881337] text-white font-semibold py-3 rounded-lg mt-5"
            >
              Proceed to Checkout
            </button>

            <Link
              to="/products"
              className="block text-center text-[#9F1239] font-medium mt-4"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      )}

    </div>
  );
};

export default Cart;
