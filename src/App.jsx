import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./Components/Navbar";

import Home from "./Pages/Home";
import Products from "./Pages/Products";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import NotFound from "./Pages/NotFound"
import Login from "./Pages/Login";
import Favorites from "./Pages/Favorites";
import Checkout from "./Pages/Checkout";
import OrderSuccess from "./Pages/OrderSuccess";
import Order from "./Pages/Order";

function App() {
  return (
    <BrowserRouter>

      <Navbar />
      <Routes>

      <Route path="/" element={<Home />} />

<Route path="/products" element={<Products />} />

<Route path="/category/:category" element={<Products key={window.location.pathname} />}
/>


{/* Category routes */}
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

<Route path="/favorites" element={<Favorites />} />

<Route path="/cart" element={<Cart />} />

<Route path="/checkout" element={<Checkout />} />

<Route path="/order-success" element={<OrderSuccess />} />

<Route path="/orders" element={<Order/>} />

<Route path="/Login" element={<Login />} />

<Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App;