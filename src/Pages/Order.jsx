import { useEffect, useState } from "react";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        setOrders(savedOrders);
    }, []);

    return (
  <div className="p-6 max-w-4xl mx-auto">

    <h1 className="text-3xl font-bold mb-6">
      My Orders
    </h1>

    {orders.length === 0 ? (
      <p className="text-gray-600">
        No orders yet.
      </p>
    ) : (
      orders.map((order, index) => (
        <div
          key={index}
          className="border rounded-lg p-5 mb-4 shadow"
        >
          <h2 className="text-xl font-bold mb-2">
            Order #{index + 1}
          </h2>

          {order.customer && (
  <div className="mb-3 text-gray-700">
    <p><strong>Customer:</strong> {order.customer.name}</p>
    <p><strong>Phone:</strong> {order.customer.phone}</p>
    <p><strong>Address:</strong> {order.customer.address}</p>
    <p>
      <strong>City:</strong> {order.customer.city} - {order.customer.pincode}
    </p>
  </div>
)}

<p className="mb-2">
  <strong>Payment Method:</strong>{" "}
  {order.payment || "Cash on Delivery"}
</p>

          <p>
            Total: ₹{Number(order.total || 0).toFixed(2)}
          </p>

          <p>
            Items: {order.items.length}
          </p>

          {order.items?.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-t pt-4 mt-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />

              <div>
                <h3 className="font-semibold">
                  {item.title}
                </h3>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity || 1}</p>
              </div>
            </div>
          ))}
        </div>
      ))
    )}

  </div>
);
};

export default Orders;