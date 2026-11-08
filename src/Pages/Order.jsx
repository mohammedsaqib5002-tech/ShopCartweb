import { useState } from "react";

const Orders = () => {
 const [orders] = useState(() => {
  try {
    const savedOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );
    return Array.isArray(savedOrders) ? savedOrders : [];
  } catch {
    return [];
  }
});

  return (
    <div className="min-h-screen bg-gray-50 px-3 py-6 sm:px-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          My Orders 📦
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-gray-600 text-lg mb-4">
              You haven't placed any orders yet.
            </p>
            <a
              href="/products"
              className="inline-block bg-rose-800 hover:bg-rose-900 text-white px-6 py-3 rounded-lg"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {[...orders].reverse().map((order, index) => (
              <div
                key={order.id || index}
                className="bg-white border rounded-xl shadow-sm p-4 sm:p-6"
              >
                {/* Order Header */}
                <div className="flex flex-wrap justify-between gap-3 border-b pb-4">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                      Order #{order.id || index + 1}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {order.date || "Date not available"}
                    </p>
                  </div>

                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold h-fit">
                    Order Placed
                  </span>
                </div>

                {/* Customer Details */}
                {order.customer && (
                  <div className="py-4 border-b">
                    <h3 className="font-bold text-gray-800 mb-2">
                      Delivery Details
                    </h3>

                    <p className="text-gray-600 text-sm">
                      <strong>Name:</strong> {order.customer.name}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <strong>Phone:</strong> {order.customer.phone}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <strong>Address:</strong> {order.customer.address}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <strong>City:</strong> {order.customer.city} -{" "}
                      {order.customer.pincode}
                    </p>
                  </div>
                )}

                {/* Ordered Products */}
                <div className="py-4">
                  <h3 className="font-bold text-gray-800 mb-3">
                    Ordered Products
                  </h3>

                  {(order.items || []).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 sm:gap-4 border-b last:border-0 py-3"
                    >
                      <img
                        src={
                          item.thumbnail ||
                          item.images?.[0] ||
                          item.image
                        }
                        alt={item.title}
                        className="w-20 h-20 object-contain rounded-lg bg-gray-50"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 line-clamp-2">
                          {item.title}
                        </h4>

                        <p className="text-sm text-gray-500 mt-1">
                          Price: ₹{Number(item.price).toFixed(2)}
                        </p>

                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity || 1}
                        </p>
                      </div>

                      <p className="font-bold text-gray-800 text-sm sm:text-base">
                        ₹
                        {(
                          Number(item.price) *
                          (item.quantity || 1)
                        ).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Payment and Total */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">
                      Payment Method
                    </span>
                    <span className="font-semibold">
                      {order.payment || "Cash on Delivery"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="font-bold text-lg">
                      Total Amount
                    </span>
                    <span className="text-xl font-bold text-rose-800">
                      ₹{Number(order.total || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
