import React, { useState, useMemo } from "react";
import { ShoppingCart, Search } from "lucide-react";
import ProductGrid from "../components/ProductGird";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, setSelectedCategory } from "../features/features/products/ProductSlice";
import { Link } from "react-router-dom"; // Added missing import

const categories = [
  "All",
  "Engine",
  "Exhaust",
  "Wheels",
  "Tyres",
  "Brakes",
  "Suspension",
  "Interior",
  "Electronics",
  "Lighting",
  "Body",
  "Accessories",
  "Transmission",
  "Steering",
];

const Shop = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.products.searchTerm);
  const selectedCategory = useSelector((state) => state.products.selectedCategory);
  const cartItems = useSelector((state) => state.cart.items);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleCategoryClick = (category) => {
    dispatch(setSelectedCategory(category));
  };

  return (
    <div className="min-h-screen pt-25 bg-slate-800">
      {/* Header Section */}
      <header className="bg-gray-800 w-full mx-auto rounded-lg shadow-lg mb-8">
        <div className="container mx-auto px-4 py-6 mb-18">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products, brands, and categories..."
                className="w-full p-4 pl-12 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Cart Button */}
            <Link to="/cart" className="fixed bottom-5 right-5 z-50 bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full flex justify-center items-center shadow-lg cursor-pointer transition duration-300 transform hover:scale-105"
              aria-label="Shopping cart">
              <ShoppingCart size={24} />
              {/* Cart item count badge */}
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative bg-[url('/b.jpg')] bg-no-repeat h-70vh bg-cover bg-center mb-12">
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Premium Auto Parts</h1>
            <p className="text-xl md:text-2xl my-6">Everything your vehicle needs</p>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-white">Shop by Category</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-2 rounded-full transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 mb-16">
        <ProductGrid searchQuery={searchTerm} category={selectedCategory} />
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-900 shadow-md py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-white mb-2">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-gray-300">
                Get the latest updates on new products and special offers
              </p>
            </div>
            <form className="w-full md:w-1/3 relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="py-4 text-gray-800 px-6 rounded-full shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full absolute right-1 top-1 transition duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;