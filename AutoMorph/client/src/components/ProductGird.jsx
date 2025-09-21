import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const ProductGrid = ({ searchQuery, category }) => {
  const filteredProducts = useSelector((state) => state.products.filteredItems);

  return (
    <div>
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-600">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {category === "All" ? "All Products" : category}
            </h2>
            <p className="text-gray-600">{filteredProducts.length} products</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link 
                to={`/product/${product.id}`} 
                className="group transition-transform duration-200 hover:scale-105" 
                key={product.id}
              >
                <div className="shadow-lg rounded-md overflow-hidden cursor-pointer bg-white">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-fill group-hover:scale-110 transition duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold my-2 line-clamp-1">{product.title}</h2>
                    <p className="text-sm text-gray-500 pb-4 border-b border-gray-200 line-clamp-2">
                      {product.description.substring(0, 80) + "..."}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-xl font-semibold text-blue-600">${product.price}</p>
                      <span className="text-blue-500 font-medium group-hover:text-blue-700 transition-colors">
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductGrid;