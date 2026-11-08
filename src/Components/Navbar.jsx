import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaHeart,
  FaSignOutAlt
} from "react-icons/fa";
import { useSelector } from "react-redux";

function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("token")
  );

  useEffect(() => {
    const updateLoginStatus = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("authChanged", updateLoginStatus);
    window.addEventListener("storage", updateLoginStatus);

    return () => {
      window.removeEventListener("authChanged", updateLoginStatus);
      window.removeEventListener("storage", updateLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate(
        `/products?search=${encodeURIComponent(search.trim())}`
      );
    }
  };

  const searchBar = (
    <form
      onSubmit={handleSearch}
      className="flex items-center bg-white rounded-lg overflow-hidden w-full md:w-64 lg:w-80"
    >
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 min-w-0 px-3 py-2 outline-none text-black"
      />

      <button
        type="submit"
        className="bg-[#881337] text-white px-4 py-3"
      >
        <FaSearch />
      </button>
    </form>
  );

  return (
    <nav className="bg-[#9F1239] text-white px-4 py-4">

      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">

        <Link to="/" className="text-2xl font-bold">
          ShopKart
        </Link>

        <div className="hidden md:block">
          {searchBar}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">

          <Link
            to="/cart"
            className="flex items-center gap-2 hover:text-gray-200"
          >
            <FaShoppingCart />
            Cart ({cartItems.length})
          </Link>

          {!isLoggedIn ? (
            <>
              <Link
                to="/Login"
                className="flex items-center gap-2 bg-[#881337] px-3 py-2 rounded-lg hover:bg-[#70102d]"
              >
                <FaUser />
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-white text-[#9F1239] px-3 py-2 rounded-lg font-semibold hover:bg-gray-100"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-[#881337] px-3 py-2 rounded-lg hover:bg-[#70102d]"
            >
              <FaSignOutAlt />
              Logout
            </button>
          )}

        </div>
      </div>

      <div className="md:hidden mt-4">
        {searchBar}
      </div>

      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-5 gap-y-3 mt-5 text-sm md:text-base">

        <Link to="/" className="hover:text-gray-200">
          Home
        </Link>

        <Link to="/products" className="hover:text-gray-200">
          Products
        </Link>

        <Link
          to="/favorites"
          className="flex items-center gap-2 hover:text-gray-200"
        >
          <FaHeart />
          Favorites
        </Link>

        <Link to="/orders" className="hover:text-gray-200">
          Orders
        </Link>

        <Link to="/category/smartphones" className="hover:text-gray-200">
          Electronics
        </Link>

        <Link to="/category/mens-shirts" className="hover:text-gray-200">
          Men's Shirts
        </Link>

        <Link to="/category/womens-dresses" className="hover:text-gray-200">
          Women's Dresses
        </Link>

        <Link to="/category/womens-jewellery" className="hover:text-gray-200">
          Jewellery
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;