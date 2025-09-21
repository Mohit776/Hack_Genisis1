import React from "react";  
import { motion } from "framer-motion";
import Particles from './Particle.jsx';

const TrustedByBrands = () => {
  const brands = [
    { name: "Toyota", logo: "/public/brands/Toyota.png" },
    { name: "BMW", logo: "/public/brands/BMW.png" },
    { name: "Mercedes", logo: "/public/brands/Mercedes.png" },
    { name: "Ford", logo: "/public/brands/Ford.png" },
    { name: "Audi", logo: "/public/brands/Audi.png" },
    { name: "Tesla", logo: "/public/brands/tesla.png" },
    { name: "Honda", logo: "/public/brands/honda.png" },
    { name: "Hyundai", logo: "/public/brands/Hyundai.png" },
    // Duplicate the array to create seamless looping
    { name: "Toyota", logo: "/public/brands/Toyota.png" },
    { name: "BMW", logo: "/public/brands/BMW.png" },
    { name: "Mercedes", logo: "/public/brands/Mercedes.png" },
    { name: "Ford", logo: "/public/brands/Ford.png" },
    { name: "Audi", logo: "/public/brands/Audi.png" },
    { name: "Tesla", logo: "/public/brands/tesla.png" },
    { name: "Honda", logo: "/public/brands/honda.png" },
    { name: "Hyundai", logo: "/public/brands/Hyundai.png" },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative bg-black w-full h-full flex-col items-center justify-center mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12 lg:py-16 pb-16 md:pb-20 lg:pb-28 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6 md:mb-8"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-3 md:mb-4">
          Trusted by{" "}
          <span className="bg-gradient-to-r from-[#26C6FF] via-[#A0006D] to-[#FF6B6B] bg-clip-text text-transparent">
            Leading Brands
          </span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
          Our technology powers innovation for the world's top automotive companies
        </p>
      </motion.div>

      {/* Infinite scrolling container */}
      <div className="relative overflow-hidden py-4">
        <motion.div
          className="flex"
          animate={{
            x: ["0%", "-100%"],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 px-2 sm:px-3 md:px-4" // Responsive spacing
              variants={item}
              whileHover={{ 
                y: -5,
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              style={{ width: "200px", minWidth: "200px" }} // Fixed width for each item
            >
              <div className="bg-[#0F111E] rounded-lg md:rounded-xl p-3 md:p-4 border border-[#1e1e2e] 
                hover:border-[#26C6FF]/50 hover:shadow-[0_5px_15px_-5px_rgba(38,198,255,0.3)]
                transition-all duration-300 group relative overflow-hidden h-full">
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#26C6FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                
                {/* Logo container */}
                <div className="relative h-12 sm:h-14 md:h-24 w-full flex items-center justify-center">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    width={500}
                    height={200}
                    style={{ objectFit: "contain" }}
                    className="filter grayscale-[30%] group-hover:grayscale-0 mt-4 md:mt-6 transition-all duration-500 max-h-full"
                  />
                </div>
                
                {/* Brand name appears on hover */}
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="text-center text-xs sm:text-sm text-[#26C6FF] mt-1 md:mt-2 font-medium"
                >
                  {brand.name}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Animated floating dots in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#26C6FF]/10"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 30],
              x: [0, (Math.random() - 0.5) * 15],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TrustedByBrands;