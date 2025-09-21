import React, { useState, useEffect } from 'react';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import LoadingSpinner from './pages/Loader';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn"
import Footer from './components/Footer'
import Shop from './pages/Shop.jsx'
import About from "./pages/About.jsx"
import TryUs from "./pages/Main.jsx"
import Community from './pages/CommunityPage.jsx'
import Geo from "./pages/geo.jsx"
import CartPage from './pages/CartPage.jsx';
import ProductsDetail from "./pages/ProductsDetail.jsx"
import {Provider} from "react-redux"
import store from "./features/features/App/Store.js"
import EducationHub from './pages/EducationHub.jsx';
import NotFound from './components/NotFound.jsx';
import Ev from './pages/Ev.jsx';
import Profile from './pages/Profile.jsx';
import Chatbot from './components/Chatbot.jsx';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <LoadingSpinner />
      </div>
    );
  }
  
  return (
    <Provider store={store}>
      <Router>
        <div className="relative z-20">
          <Navbar />
        </div>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/about' element={<About />} />
          <Route path='/OurShop' element={<Shop />} />
          <Route path='/product/:id' element={<ProductsDetail />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/TryUs' element={<TryUs />} />
          <Route path='/community' element={<Community />} />
          <Route path='/signIn' element={<SignIn />} />
          <Route path='/location' element={<Geo />} />
          <Route path='/educationhub' element={<EducationHub />} />
          <Route path='/ev-info' element={<Ev />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Chatbot/>
        <div className="relative z-20 bottom-0">
          <Footer />
        </div>
      </Router>
    </Provider>
  )
}

export default App;