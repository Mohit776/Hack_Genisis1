import React, { useState, useMemo } from "react";
import { ShoppingCart, Search, Star, Truck, Shield, ArrowRight } from "lucide-react";
import ProductGrid from "../components/ProductGird";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, setSelectedCategory } from "../features/features/products/ProductSlice";
import { Link } from "react-router-dom";

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
  // "Body",
  // "Accessories",
  // "Transmission",
  // "Steering",
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
    <div className="min-h-screen pt-25 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      {/* Header Section */}
      {/* <header className="bg-gradient-to-r from-gray-900 to-slate-800 w-full mx-auto rounded-b-2xl shadow-2xl mb-8 border-b border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
         
          
          </div>
        </div>
      </header> */}
        <Link 
              to="/cart" 
              className="fixed left-4 bottom-4 z-50 group bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white w-16 h-16 rounded-2xl flex justify-center items-center shadow-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/25"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={26} className="transition-transform group-hover:scale-110" />
              {/* Cart item count badge */}
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-slate-900 shadow-lg">
                  {itemCount}
                </span>
              )}
            </Link>

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-blue-900/40 via-slate-900/50 to-purple-900/40 h-80 bg-cover bg-center mb-16 rounded-3xl mx-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Premium Auto Parts
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 font-light">
              High-performance parts for exceptional driving experiences
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-blue-300">
                <Star className="w-5 h-5 fill-current" />
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center gap-2 text-green-300">
                <Truck className="w-5 h-5" />
                <span>Fast Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-300">
                <Shield className="w-5 h-5" />
                <span>2-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto pb-10  w-full ">
              <input
                type="text"
                placeholder="Search products, brands, and categories..."
                className="w-full p-4 pl-14 rounded-xl bg-gray-800/60 backdrop-blur-sm text-white placeholder-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              />
              <Search className="absolute left-5 top-5 w-5 h-5 text-gray-400" />
            </div>

      {/* Category Filters */}
      <div className="container mx-auto px-4 mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Shop by Category
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover our extensive range of premium automotive parts and accessories
          </p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 font-medium ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25"
                  : "bg-gray-800/60 backdrop-blur-sm text-gray-200 hover:bg-gray-700/60 border border-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 mb-20">
        <div className="bg-gray-900/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
          <ProductGrid searchQuery={searchTerm} category={selectedCategory} />
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 hover:border-blue-500/30 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Truck className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Free Shipping</h3>
            </div>
            <p className="text-gray-400">Free delivery on orders over $100. Fast and reliable shipping nationwide.</p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 hover:border-green-500/30 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <Shield className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Quality Guarantee</h3>
            </div>
            <p className="text-gray-400">All products come with a 2-year warranty and 30-day money-back guarantee.</p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 hover:border-purple-500/30 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Star className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Expert Support</h3>
            </div>
            <p className="text-gray-400">Our automotive experts are here to help you choose the right parts.</p>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-gray-900 to-slate-800 shadow-2xl py-16 border-t border-gray-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Stay Updated with Latest Offers
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Get exclusive deals, new product announcements, and expert tips delivered to your inbox
            </p>
            <form className="w-full max-w-2xl mx-auto relative">
              <input
                type="email"
                placeholder="Enter your email address"
                className="py-4 px-8 rounded-full bg-gray-800/60 backdrop-blur-sm text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full pr-40"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white py-3 px-8 rounded-full absolute right-1 top-1 transition-all duration-300 flex items-center gap-2 group"
              >
                Subscribe
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;