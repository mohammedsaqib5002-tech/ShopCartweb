import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../Redux/cartSlice";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    name:"",
    phone:"",
    adress:"",
    city:"",
    pincode:"",
  });

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );
  const handlePlaceOrder = () =>{
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

if (cartItems.length === 0) {
  alert("Your cart is empty!");
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

const selectedPayment =
  document.querySelector('input[name="payment"]:checked')?.value ||
  "Cash on Delivery";

const newOrder = {
  id: Date.now(),
  items: cartItems,
  total: totalPrice,
  date: new Date().toLocaleString(),
  customer: customer,
  payment: selectedPayment,
};

localStorage.setItem(
  "orders",
  JSON.stringify([...existingOrders, newOrder])
);
    dispatch(clearCart());
    navigate("/order-success");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Checkout 🛒
      </h1>

      <div className="border rounded-lg p-6 shadow mb-6">
  <h2 className="text-2xl font-semibold mb-4">
    Delivery Details
  </h2>
  
  <input
  type="text"
  placeholder="Full Name"
  value={customer.name}
  onChange={(e) =>
    setCustomer({ ...customer, name: e.target.value })
  }
  className="w-full border p-3 rounded mb-3"
/>

<input
  type="tel"
  placeholder="Phone Number"
  value={customer.phone}
  onChange={(e) =>
    setCustomer({ ...customer, phone: e.target.value })
  }
  className="w-full border p-3 rounded mb-3"
/>

<input
  type="text"
  placeholder="Address"
  value={customer.address}
  onChange={(e) =>
    setCustomer({ ...customer, address: e.target.value })
  }
  className="w-full border p-3 rounded mb-3"
/>

<input
  type="text"
  placeholder="City"
  value={customer.city}
  onChange={(e) =>
    setCustomer({ ...customer, city: e.target.value })
  }
  className="w-full border p-3 rounded mb-3"
/>

<input
  type="text"
  placeholder="Pincode"
  value={customer.pincode}
  onChange={(e) =>
    setCustomer({ ...customer, pincode: e.target.value })
  }
  className="w-full border p-3 rounded"
/>

<div className="border rounded-lg p-6 shadow mb-6">
  <h2 className="text-2xl font-semibold mb-4">
    Payment Method
  </h2>

  <label className="flex items-center gap-3 mb-3">
    <input
      type="radio"
      name="payment"
      value="Cash on Delivery"
      defaultChecked
    />
    Cash on Delivery
  </label>

  <label className="flex items-center gap-3 mb-3">
    <input
      type="radio"
      name="payment"
      value="UPI"
    />
    UPI
  </label>

  <label className="flex items-center gap-3">
    <input
      type="radio"
      name="payment"
      value="Card"
    />
    Credit / Debit Card
  </label>
</div>
</div>

      <div className="border rounded-lg p-6 shadow">
        <h2 className="text-2xl font-semibold mb-4">
          Order Summary
        </h2>

        {cartItems.map((product) => (
          <div
            key={product.id}
            className="flex justify-between border-b py-3"
          >
            <div>
              <p className="font-semibold">{product.title}</p>
              <p>
                Quantity: {product.quantity || 1}
              </p>
            </div>

            <p className="font-bold">
              ₹{(product.price * (product.quantity || 1)).toFixed(2)}
            </p>
          </div>
        ))}

        <div className="text-2xl font-bold mt-6">
          Total: ₹{totalPrice.toFixed(2)}
        </div>

        <button
        onClick={handlePlaceOrder}

          className="bg-blue-600 text-white px-6 py-3 rounded mt-6"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;