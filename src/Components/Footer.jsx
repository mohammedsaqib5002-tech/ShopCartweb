import { useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    setMessage("Newsletter subscription will be available soon!");
    setEmail("");
  };

  return (
    <footer className="bg-gray-950 text-white mt-4">

      <div className="max-w-7xl mx-auto px-5 py-12">

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-purple-700 to-indigo-700 rounded-2xl p-6 sm:p-8 mb-12 text-center">

          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Subscribe to Our Newsletter
          </h2>

          <p className="text-purple-100 text-sm mb-5">
            Get updates about new products, offers and exciting deals.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row max-w-xl mx-auto gap-3"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 rounded-lg px-4 py-3 text-gray-900 outline-none"
            />

            <button
              type="submit"
              className="bg-gray-950 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Subscribe
            </button>
          </form>

          {message && (
            <p className="text-sm mt-3 text-white">
              {message}
            </p>
          )}

        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Company */}
          <div>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">
              ShopKart
            </h2>

            <p className="text-gray-400 text-sm leading-7">
              Your one-stop destination for online shopping.
              Discover quality products at amazing prices.
              Shop smarter with ShopKart!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-purple-400">Home</Link></li>
              <li><Link to="/products" className="hover:text-purple-400">Products</Link></li>
              <li><Link to="/favorites" className="hover:text-purple-400">Favorites</Link></li>
              <li><Link to="/cart" className="hover:text-purple-400">Shopping Cart</Link></li>
              <li><Link to="/orders" className="hover:text-purple-400">My Orders</Link></li>
            </ul>
          </div>

          {/* Customer Benefits */}
          <div>
            <h3 className="text-lg font-bold mb-5">
              Why Shop With Us?
            </h3>

            <ul className="space-y-4 text-gray-400 text-sm">
              <li>
                <span className="text-purple-400">✓</span>
                {" "}Easy Returns
              </li>

              <li>
                <span className="text-purple-400">✓</span>
                {" "}Secure Shopping
              </li>

              <li>
                <span className="text-purple-400">✓</span>
                {" "}24/7 Customer Support
              </li>

              <li>
                <span className="text-purple-400">✓</span>
                {" "}Wide Product Collection
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-5">
              Contact Us
            </h3>

            <div className="space-y-4 text-gray-400 text-sm">

              <p>
                <span className="text-purple-400">Email:</span>
                <br />
                Shopcartweb@gmail.com
              </p>

              <p>
                <span className="text-purple-400">Phone:</span>
                <br />
                7689765434
              </p>

              <p>
                <span className="text-purple-400">Support:</span>
                <br />
                whatsapp
              </p>

            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center">

          <p className="text-gray-500 text-sm">
            © 2026 ShopKart. All Rights Reserved.
          </p>

          <p className="text-gray-600 text-xs mt-2">
            Designed with care for a better shopping experience.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;