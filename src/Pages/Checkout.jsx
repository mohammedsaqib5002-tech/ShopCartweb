import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../Redux/cartSlice";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [payment, setPayment] = useState("Cash on Delivery");

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * (item.quantity || 1),
    0
  );

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (
      !customer.name.trim() ||
      !customer.phone.trim() ||
      !customer.address.trim() ||
      !customer.city.trim() ||
      !customer.pincode.trim()
    ) {
      alert("Please fill in all delivery details.");
      return;
    }

    if (!/^\d{10}$/.test(customer.phone.trim())) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!/^\d{6}$/.test(customer.pincode.trim())) {
      alert("Please enter a valid 6-digit pincode.");
      return;
    }

    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total: totalPrice,
      date: new Date().toLocaleString(),
      customer,
      payment,
    };

    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, newOrder])
    );

    dispatch(clearCart());
    navigate("/order-success");
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-rose-700";

  return (
    <div className="min-h-screen bg-gray-50 px-3 py-6 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          Checkout 🛒
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <h2 className="text-xl font-semibold mb-3">
              Your cart is empty
            </h2>
            <button
              onClick={() => navigate("/products")}
              className="bg-rose-800 hover:bg-rose-900 text-white px-6 py-3 rounded-lg"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Delivery Details */}
            <div className="bg-white border rounded-xl shadow-sm p-4 sm:p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-5">
                Delivery Details
              </h2>

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={customer.name}
                onChange={handleChange}
                className={inputClass}
              />

              <input
                type="tel"
                name="phone"
                placeholder="10-digit Phone Number"
                value={customer.phone}
                onChange={handleChange}
                maxLength="10"
                className={inputClass}
              />

              <textarea
                name="address"
                placeholder="Full Delivery Address"
                value={customer.address}
                onChange={handleChange}
                rows="3"
                className={inputClass}
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={customer.city}
                onChange={handleChange}
                className={inputClass}
              />

              <input
                type="text"
                name="pincode"
                placeholder="6-digit Pincode"
                value={customer.pincode}
                onChange={handleChange}
                maxLength="6"
                className={inputClass}
              />

              <h2 className="text-xl font-bold text-gray-800 mt-3 mb-4">
                Payment Method
              </h2>

              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="Cash on Delivery"
                    checked={payment === "Cash on Delivery"}
                    onChange={(e) => setPayment(e.target.value)}
                    className="accent-rose-800"
                  />
                  Cash on Delivery
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="UPI"
                    checked={payment === "UPI"}
                    onChange={(e) => setPayment(e.target.value)}
                    className="accent-rose-800"
                  />
                  UPI
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="Card"
                    checked={payment === "Card"}
                    onChange={(e) => setPayment(e.target.value)}
                    className="accent-rose-800"
                  />
                  Credit / Debit Card
                </label>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white border rounded-xl shadow-sm p-4 sm:p-6 h-fit">
              <h2 className="text-xl font-bold text-gray-800 mb-5">
                Order Summary
              </h2>

              {cartItems.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 border-b py-4"
                >
                  <img
                    src={
                      product.thumbnail ||
                      product.images?.[0]
                    }
                    alt={product.title}
                    className="w-16 h-16 object-contain rounded-lg bg-gray-50"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 line-clamp-2">
                      {product.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      Quantity: {product.quantity || 1}
                    </p>
                  </div>

                  <p className="font-bold text-gray-800">
                    ₹
                    {(
                      Number(product.price) *
                      (product.quantity || 1)
                    ).toFixed(2)}
                  </p>
                </div>
              ))}

              <div className="flex justify-between mt-6 text-lg font-bold">
                <span>Total Amount</span>
                <span className="text-rose-800">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-rose-800 hover:bg-rose-900 text-white font-semibold py-3 rounded-lg mt-6 transition"
              >
                Place Order
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="w-full border border-rose-800 text-rose-800 hover:bg-rose-50 font-semibold py-3 rounded-lg mt-3"
              >
                Back to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
