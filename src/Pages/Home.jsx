import { useEffect, useState, useRef } from "react";
import ProductCard from "../Components/ProductCard";
import ScrollReveal from "../Components/ScrollReveal";

function Home() {
  const [products, setProducts] = useState([]);
  const [openFAQ, setOpenFAQ] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=194")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.products || []);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]);
      });
  }, []);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: direction * 300,
        behavior: "smooth",
      });
    }
  };

  const faqs = [
    {
      question: "How can I place an order?",
      answer:
        "Browse our products, add your favourite items to the cart, and proceed to checkout to place your order.",
    },
    {
      question: "Can I add products to favourites?",
      answer:
        "Yes! Click the heart icon on a product to add it to your favourites list.",
    },
    {
      question: "How can I track my order?",
      answer:
        "You can check your order confirmation after successfully placing an order.",
    },
    {
      question: "Can I remove items from my cart?",
      answer:
        "Yes! Open your cart and use the remove option to delete any item.",
    },
    {
      question: "Is ShopKart mobile friendly?",
      answer:
        "Yes! ShopKart is designed to work on mobile phones, tablets, and desktop devices.",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-2 sm:p-4">

      {/* Welcome Section */}
      <section className="bg-gradient-to-r from-purple-700 to-indigo-600 text-white rounded-2xl p-6 sm:p-10 mb-8 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold mb-3">
          Welcome to ShopKart
        </h1>

        <p className="text-sm sm:text-lg mb-4">
          Discover amazing products at amazing prices!
        </p>

        <p className="text-xs sm:text-sm opacity-90">
          Shop your favourite products all in one place.
        </p>
      </section>

      {/* Product Carousel */}
      <section className="mb-12">

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl sm:text-2xl font-bold">
            Featured Products
          </h2>

          <div className="flex gap-2">
            <button
              onClick={() => scrollCarousel(-1)}
              className="bg-gray-800 text-white w-9 h-9 rounded-full hover:bg-purple-700 transition"
              aria-label="Previous products"
            >
              &#10094;
            </button>

            <button
              onClick={() => scrollCarousel(1)}
              className="bg-gray-800 text-white w-9 h-9 rounded-full hover:bg-purple-700 transition"
              aria-label="Next products"
            >
              &#10095;
            </button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-5"
          style={{ scrollbarWidth: "none" }}
        >
          {products.slice(0, 12).map((product) => (
            <ScrollReveal
              key={product.id}
              className="min-w-[160px] w-[160px] sm:min-w-[220px] sm:w-[220px]"
            >
              <div className="transition-all duration-300 hover:-translate-y-2 hover:shadow-xl rounded-xl">
                <ProductCard product={product} />
              </div>
            </ScrollReveal>
          ))}

        </div>

      </section>

      {/* All Products */}
      <section className="mb-12">

        <h2 className="text-xl sm:text-2xl font-bold mb-5">
          Explore Our Products
        </h2>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.slice(12).map((product) => (
            <ScrollReveal key={product.id}>
              <div className="transition-all duration-300 hover:-translate-y-2 hover:shadow-xl rounded-xl">
                <ProductCard product={product} />
              </div>
            </ScrollReveal>
          ))}
          </div>

      </section>
      {/* FAQ Section */}
      <section className="mb-3 mt-8 rounded-2xl bg-gradient-to-br from-purple-50 via-white to-indigo-50 px-4 py-8 sm:px-8 sm:py-10">

        <div className="text-center mb-7">
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-widest">
            Need Help?
          </span>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
            Frequently Asked Questions
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Find answers to your questions about shopping with ShopKart.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">

          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-xl border transition-all duration-300 overflow-hidden ${openFAQ === index
                ? "border-purple-300 bg-white shadow-lg"
                : "border-gray-200 bg-white/80 shadow-sm hover:border-purple-200 hover:shadow-md"
                }`}
            >

              <button
                onClick={() =>
                  setOpenFAQ(openFAQ === index ? null : index)
                }
                className="w-full flex justify-between items-center text-left p-4 sm:p-5 font-semibold text-gray-800 gap-3"
                aria-expanded={openFAQ === index}
              >
                <span className="text-sm sm:text-base">
                  {faq.question}
                </span>

                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${openFAQ === index
                    ? "bg-purple-600 text-white rotate-180"
                    : "bg-purple-100 text-purple-700"
                    }`}
                >
                  {openFAQ === index ? "−" : "+"}
                </span>

              </button>

              {openFAQ === index && (
                <div className="px-5 pb-5 text-gray-600 text-sm leading-7 border-t border-purple-100 pt-3">
                  {faq.answer}
                </div>
              )}

            </div>
          ))}

        </div>

      </section>

    </div>
  );
}

export default Home;
