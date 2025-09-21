import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from "axios";

const CommunityPage = () => {
  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // State for posts and form data
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    idea: '',
    category: 'Feature Request'
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Fetch data from JSON file
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Import the JSON file directly
        const response = await import('../Data/Data/CommunityData.json');
        setPosts(Array.isArray(response.default) ? response.default : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setPosts([]);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const cardHover = {
    scale: 1.03,
    y: -2,
    boxShadow: "0 10px 25px -5px rgba(34, 211, 238, 0.4)",
    transition: {
      duration: 0.3
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage('');
    
    try {
      // Frontend applications cannot write to JSON files in src folder
      // This would require a backend API endpoint to persist data
      console.log('Submitting data:', formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add the new post to the local state (temporary - resets on page refresh)
      const newPost = {
        id: Date.now(),
        user_name: formData.name,
        heading: "New Idea Submission",
        description: formData.idea,
        category: formData.category,
        likes: 0,
        comments: 0,
        time: new Date().toLocaleString()
      };
      
      setPosts(prevPosts => [newPost, ...prevPosts]);
      setSubmitMessage('Your idea has been submitted successfully!');
      
      // Reset form
      setFormData({
        name: '',
        idea: '',
        category: 'Feature Request'
      });
    } catch (error) {
      console.error('Error submitting data:', error);
      setSubmitMessage('There was an error submitting your idea. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white font-sans overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-cyan-500/10"
            style={{
              width: Math.random() * 10 + 5 + 'px',
              height: Math.random() * 10 + 5 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: Math.random() * 5 + 's'
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <main className="p-8 pt-32 space-y-12 relative max-w-7xl mx-auto">
        {/* Header with animation */}
        <motion.section 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8 relative"
        >
          <div className="absolute -top-4 -left-4 w-32 h-32 bg-purple-500/10 rounded-full filter blur-3xl"></div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300 drop-shadow-lg">
            FutureSpace Community
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 mt-3 max-w-2xl"
          >
            Connect with the brightest minds in tech. Share knowledge, collaborate on projects, and shape the future together.
          </motion.p>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
        </motion.section>

        {/* Grid of Posts with staggered animation */}
        <motion.section 
          ref={ref}
          variants={container}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative"
        >
          {loading ? (
            // Loading state
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-[#161B22]/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50 relative overflow-hidden animate-pulse">
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-700"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-5/6 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-4/6"></div>
              </div>
            ))
          ) : (
            // Posts data
            posts.map((post) => (
              <motion.div 
                key={post.id}
                variants={item}
                whileHover={cardHover}
                className="bg-[#161B22]/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50 hover:border-cyan-400/30 relative overflow-hidden"
              >
                {/* Card accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-cyan-400"></div>
                
                {/* Animated content */}
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500"></div>
                    <div>
                      <h3 className="font-semibold text-cyan-300">{post.user_name}</h3>
                      <p className="text-xs text-gray-500">{post.time}</p>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{post.heading}</h3>
                  <p className="text-sm text-gray-400">
                    {post.description}
                  </p>
                  
                  {/* Card footer */}
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-800/50">
                    <div className="flex space-x-3 text-xs">
                      <span className="text-gray-400">{post.likes} likes</span>
                      <span className="text-gray-400">{post.comments} comments</span>
                    </div>
                    <button className="text-xs bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-full transition-all">
                      Join
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.section>

        {/* Feedback section with glass morphism effect */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-[#161B22]/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-700/30 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-500/20 rounded-full filter blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300 mb-6">
              Share Your Vision
            </h2>
            {submitMessage && (
              <div className={`mb-4 p-3 rounded-xl ${submitMessage.includes('error') ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>
                {submitMessage}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 rounded-xl bg-[#0D1117]/70 backdrop-blur-sm text-white border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Your Idea</label>
                <textarea
                  rows="4"
                  name="idea"
                  value={formData.idea}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 rounded-xl bg-[#0D1117]/70 backdrop-blur-sm text-white border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                  placeholder="Share your innovative idea with the community"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl bg-[#0D1117]/70 backdrop-blur-sm text-white border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent"
                >
                  <option value="Feature Request">Feature Request</option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="General Feedback">General Feedback</option>
                  <option value="Project Idea">Project Idea</option>
                </select>
              </div>
              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: submitting ? 1 : 1.02 }}
                whileTap={{ scale: submitting ? 1 : 0.98 }}
                className={`px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg transition-all ${submitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-cyan-400/30'}`}
              >
                {submitting ? 'Submitting...' : 'Submit Proposal'}
              </motion.button>
            </form>
          </div>
        </motion.section>
      </main>

      {/* Global styles for animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
          100% { transform: translateY(0) translateX(0); }
        }
        
        body {
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
};

export default CommunityPage;