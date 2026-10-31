import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaShoppingCart, FaUser, FaSearch, FaHeart } from "react-icons/fa"
import { useSelector } from "react-redux";

function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <nav className="bg-blue-600 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          ShopKart
        </Link>
        
        {/* Search Bar */}
        <div className="flex item-center bg-white rounded-lg overflow-hidden e-96">
            <input type="text" 
                   placeholder="search products..."
                   value={search}
                   onChange={(e) => 
                    setSearch(e.target.value)}
                   className="flex-1 px-4 py-2 outline-none text-black placeholder-gray-500 bg-white"
                   />
            <button 
            onClick={() => navigate(`/products?search=${encodeURIComponent(search)}`)}
            className="bg-blue-700 px-4 py-3">
                <FaSearch />
                </button>
                </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">

          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>

          
          <Link to="/products" className="hover:text-gray-200">
            Products
          </Link>

          <Link to="/favorites" className="hover:text-gray-200">
           <FaHeart />
          Favorites
          </Link>

           <Link
            to="/cart"
            className="flex items-center gap-2 hover:text-gray-200"
          >
            <FaShoppingCart />
            Cart
          </Link>



          <Link
  to="/category/smartphones"
  className="hover:text-gray-200"
>
  Electronics
</Link>

<Link
  to="/category/mens-shirts"
  className="hover:text-gray-200"
>
  Men's shirts
</Link>

<Link
  to="/category/womens-dresses"
  className="hover:text-gray-200"
>
  Women's dresses
</Link>

<Link
  to="/category/womens-jewellery"
  className="hover:text-gray-200"
>
  Jewelery
</Link>

<Link to="/orders"
className="hover:text-gray-200">
  Orders
</Link>

<Link
  
             className="flex items-center gap-2 hover:text-gray-200">
            <FaShoppingCart />
            Cart ({cartItems.length})
          </Link>
          <Link to="/Login" className="bg-blue-600 text-white px-4 py-2 rounded">Login</Link>

        </div>

      </div>
    </nav>
  )
}

export default Navbar;
