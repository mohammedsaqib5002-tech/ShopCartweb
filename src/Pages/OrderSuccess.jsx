import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        🎉 Order Placed Successfully!
      </h1>

      <p className="text-xl mb-2">
        Thank you for shopping with us.
      </p>

      <p className="text-gray-600 mb-8">
        Your order has been confirmed.
      </p>

      <div className="flex justify-center gap-4">
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Continue Shopping
        </Link>

        <Link
          to="/orders"
          className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900"
        >
          View My Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;