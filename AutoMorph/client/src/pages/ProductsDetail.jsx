import React from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../features/features/cart/cartSlice';
import { ShoppingCart, ArrowLeft, Heart, Share2, Check } from 'lucide-react';

const ProductsDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addedToCart, setAddedToCart] = React.useState(false);

  const cartItems = useSelector((state) => state.cart.items);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const product = useSelector((state) => {
    return state.products.items.find((p) => p.id === parseInt(id));
  });

  const handleAddToCart = () => {
    dispatch(addItem(product));
    setAddedToCart(true);
    
    // Reset the added state after 2 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  if (!product) {
    return (
      <div className='container mx-auto px-4 py-8 pt-32'>
        <div className='text-center max-w-md mx-auto bg-white p-8 rounded-xl shadow-md'>
          <h2 className='text-2xl font-bold mb-4 text-gray-800'>Product Not Found!</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link 
            to={"/"} 
            className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'
          >
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8 pt-28'>
      {/* Floating Cart Button */}
      <Link 
        to="/cart" 
        className="fixed bottom-5 right-5 z-50 bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full flex justify-center items-center shadow-lg cursor-pointer transition-all duration-300 hover:scale-110"
        aria-label="Shopping cart"
      >
        <ShoppingCart size={24} />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </Link>

      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors font-medium"
      >
        <ArrowLeft size={18} className="mr-2" />
        Back
      </button>
      
      <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 p-8'>
          {/* Product Image */}
          <div className='relative'>
            <div className='max-h-[65vh] overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center p-8'>
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex mt-4 space-x-3">
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg flex items-center justify-center transition-colors">
                <Heart size={18} className="mr-2" />
                Wishlist
              </button>
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg flex items-center justify-center transition-colors">
                <Share2 size={18} className="mr-2" />
                Share
              </button>
            </div>
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <span className='inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-3'>
                {product.category}
              </span>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                {product.title}
              </h1>
              <div className="flex items-baseline mb-4">
                <span className='text-3xl font-bold text-gray-900'>
                  ${product.price}
                </span>
                <span className="ml-2 text-green-600 font-medium">In Stock</span>
              </div>
            </div>
            
            <p className='text-gray-700 leading-relaxed border-t pt-4'>{product.description}</p>
            
            <div className="border-t pt-4">
              <div className="flex items-center mb-2">
                <Check size={18} className="text-green-500 mr-2" />
                <span className="text-gray-700">Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center">
                <Check size={18} className="text-green-500 mr-2" />
                <span className="text-gray-700">30-day money-back guarantee</span>
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
                addedToCart 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white font-semibold shadow-md hover:shadow-lg`}
            >
              {addedToCart ? (
                <>
                  <Check size={20} />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart size={20} />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsDetail;