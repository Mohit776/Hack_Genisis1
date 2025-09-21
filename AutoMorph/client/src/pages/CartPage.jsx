import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity, clearCart } from '../features/features/cart/cartSlice';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CreditCard, Shield, Truck, X } from 'lucide-react';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [removingItem, setRemovingItem] = useState(null);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = total > 50 ? 0 : 5.99;
  const tax = total * 0.08; // Example tax calculation
  const finalTotal = total + shipping + tax;

  const handleRemoveItem = (id) => {
    setRemovingItem(id);
    setTimeout(() => {
      dispatch(removeItem({ id }));
      setRemovingItem(null);
    }, 300);
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity === 0) {
      handleRemoveItem(id);
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag size={36} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link 
              to="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              <ArrowLeft size={18} className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <Link 
            to="/"
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft size={18} className="mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 ml-6">Shopping Cart</h1>
          <button 
            onClick={() => dispatch(clearCart())}
            className="ml-auto text-red-500 hover:text-red-700 font-medium flex items-center"
          >
            <Trash2 size={18} className="mr-1" />
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`flex items-center p-6 border-b border-gray-100 transition-all duration-300 ${removingItem === item.id ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}
                >
                  <Link to={`/product/${item.id}`} className="flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-20 h-20 object-contain rounded-lg bg-gray-100 p-2" 
                    />
                  </Link>
                  
                  <div className="ml-6 flex-grow">
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-medium text-gray-900 hover:text-blue-600 line-clamp-1">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-blue-600 font-semibold mt-1">${item.price}</p>
                    
                    <div className="flex items-center mt-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-l-lg transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-3 py-1 text-gray-800 font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-r-lg transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="ml-4 p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                      
                      <div className="ml-auto font-bold text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <Truck size={24} className="mx-auto text-blue-600 mb-2" />
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-gray-600">On orders over $50</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <Shield size={24} className="mx-auto text-blue-600 mb-2" />
                <p className="text-sm font-medium">Secure Checkout</p>
                <p className="text-xs text-gray-600">Safe & encrypted</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <X size={24} className="mx-auto text-blue-600 mb-2" />
                <p className="text-sm font-medium">Easy Returns</p>
                <p className="text-xs text-gray-600">30-day policy</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                {total < 50 && (
                  <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                    Add ${(50 - total).toFixed(2)} more for free shipping!
                  </div>
                )}
                
                <div className="border-t pt-4 font-bold text-lg">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-blue-600 text-white rounded-lg px-6 py-4 hover:bg-blue-700 transition-colors font-semibold shadow-md flex items-center justify-center">
                <CreditCard size={20} className="mr-2" />
                Proceed to Checkout
              </button>
              
              <div className="text-xs text-gray-500 text-center mt-4">
                By completing your purchase you agree to these <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;