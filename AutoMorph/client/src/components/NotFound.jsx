import React, { useEffect, useState } from 'react';
import { Home, ArrowRight, Search, Car, Zap, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const goHome = () => {
    navigate('/');
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden flex items-center justify-center relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '0.5s' }}
        ></div>
        <div 
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1.5s' }}
        ></div>
        <div 
          className="absolute top-1/3 right-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2.5s' }}
        ></div>
      </div>

      {/* Floating elements that move with cursor */}
      <div 
        className="absolute top-20 left-20 text-6xl opacity-10 font-bold select-none"
        style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
      >
        404
      </div>
      <div 
        className="absolute bottom-20 right-20 text-6xl opacity-10 font-bold select-none"
        style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
      >
        OOPS!
      </div>

      <div className="relative z-10 pt-20 text-center max-w-2xl mx-4">
        <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Animated 404 number */}
          <div className="relative mb-8">
            <h1 className="text-9xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              404
            </h1>
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-blue-400/20 blur-2xl rounded-full"></div>
          </div>

          {/* Main message */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Lost in the <span className="text-[#2EB8F4]">Digital Garage</span>
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-md mx-auto">
            The page you're looking for seems to have taken a wrong turn. Let's get you back on the road.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={goHome}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2EB8F4] to-cyan-500 hover:from-[#2EB8F4]/90 hover:to-cyan-500/90 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              <Home className="w-5 h-5" />
              Go Home
            </button>
            
            <button
              onClick={goBack}
              className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <Navigation className="w-5 h-5" />
              Go Back
            </button>
          </div>

          {/* Search suggestion */}
          {/* <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 max-w-md mx-auto">
            <div className="flex items-center mb-4">
              <Search className="w-6 h-6 text-[#2EB8F4] mr-2" />
              <h3 className="text-lg font-semibold">Can't find what you need?</h3>
            </div>
            <p className="text-slate-400 mb-4">
              Try exploring our most popular sections:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a 
                href="/education" 
                className="inline-flex items-center gap-1 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Car className="w-4 h-4" />
                <span>Education Hub</span>
              </a>
              <a 
                href="/ev-info" 
                className="inline-flex items-center gap-1 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Zap className="w-4 h-4" />
                <span>EV Information</span>
              </a>
            </div>
          </div> */}    
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-48 h-48 border-t-4 border-l-4 border-[#2EB8F4]/30 rounded-tl-2xl"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 border-b-4 border-r-4 border-[#2EB8F4]/30 rounded-br-2xl"></div>
    </div>
  );
};

export default NotFound;