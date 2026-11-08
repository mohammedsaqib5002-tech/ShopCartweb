import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Home from "./Pages/Home";
import Products from "./Pages/Products";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import NotFound from "./Pages/NotFound";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Favorites from "./Pages/Favorites";
import Checkout from "./Pages/Checkout";
import OrderSuccess from "./Pages/OrderSuccess";
import Order from "./Pages/Order";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Main Pages */}
        <main className="flex-grow">
          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/products" element={<Products />} />

            <Route
              path="/category/:category"
              element={<Products key={window.location.pathname} />}
            />

            <Route
              path="/category/smartphones"
              element={<Products category="smartphones" />}
            />

            <Route
              path="/category/mens-shirts"
              element={<Products category="mens-shirts" />}
            />

            <Route
              path="/category/womens-dresses"
              element={<Products category="womens-dresses" />}
            />

            <Route
              path="/category/womens-jewellery"
              element={<Products category="womens-jewellery" />}
            />

            <Route path="/products/:id" element={<ProductDetails />} />

            <Route path="/favorites" element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />

            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Order />
                </ProtectedRoute>
              }
            />

            <Route path="/cart" element={<Cart />} />

            <Route path="/order-success" element={<OrderSuccess />} />

            <Route path="/Login" element={<Login />} />

            <Route path="/signup" element={<Signup />} />

            <Route path="*" element={<NotFound />} />

          </Routes>
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;