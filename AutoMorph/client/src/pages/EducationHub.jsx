import React, { useState, useRef, useEffect } from "react";
import { Shield, Wrench, Zap, BarChart, Play, Clock, Eye, User, Calendar, ArrowRight, ChevronLeft, ChevronRight, BookOpen, Search, CloudLightningIcon, X, Battery, Leaf, BatteryCharging } from "lucide-react";

const EducationHub = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const carouselRef = useRef(null);
    const [activeVideo, setActiveVideo] = useState(null);
    const videoRefs = useRef([]);

    // Track mouse position for parallax effects
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX - window.innerWidth / 2) / window.innerWidth,
                y: (e.clientY - window.innerHeight / 2) / window.innerHeight,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const categories = [
        {
            id: "maintenance",
            title: "Maintenance",
            icon: <Wrench className="w-6 h-6" />,
            articleCount: 45,
            description: "Essential care routines, diagnostic techniques, and preventive measures to keep your vehicle running smoothly.",
            color: "from-blue-400 via-blue-500 to-cyan-400",
            glowColor: "shadow-blue-500/20"
        },
        {
            id: "performance",
            title: "Performance Upgrades",
            icon: <CloudLightningIcon className="w-6 h-6" />,
            articleCount: 38,
            description: "Turbocharging, ECU tuning, exhaust systems, and modifications to unlock your car's true potential.",
            color: "from-purple-400 via-violet-500 to-purple-400",
            glowColor: "shadow-purple-500/20"
        },
        {
            id: "safety",
            title: "Safety Systems",
            icon: <Shield className="w-6 h-6" />,
            articleCount: 29,
            description: "Advanced driver assistance, brake upgrades, lighting improvements, and safety modifications.",
            color: "from-emerald-400 via-green-500 to-teal-400",
            glowColor: "shadow-emerald-500/20"
        },
        {
            id: "driving",
            title: "Driving Techniques",
            icon: <BarChart className="w-6 h-6" />,
            articleCount: 33,
            description: "Track driving, defensive driving, fuel efficiency tips, and advanced driving skills development.",
            color: "from-orange-400 via-red-500 to-pink-400",
            glowColor: "shadow-orange-500/20"
        }
    ];

    const videos = [
        {
            id: 1,
            title: "Complete Brake System Maintenance Guide",
            thumbnail: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop",
            video: "/public/videos/maintaince.mp4",
            duration: "12:34",
            difficulty: "Intermediate",
            views: "24.5K",
            description: "Learn proper brake pad replacement, rotor resurfacing, and fluid maintenance for optimal stopping power."
        },
        {
            id: 2,
            title: "Turbocharger Installation & Tuning",
            thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
            video: "/public/videos/turbochargeInstallation.mp4",
            duration: "18:45",
            difficulty: "Advanced",
            views: "67.2K",
            description: "Step-by-step turbocharger installation process with ECU tuning basics for maximum performance gains."
        },
        {
            id: 3,
            title: "Modern Safety Technology Overview",
            thumbnail: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop",
            video: "/public/videos/saftey.mp4",
            duration: "9:21",
            difficulty: "Beginner",
            views: "31.8K",
            description: "Understanding ADAS systems, collision avoidance, and how to maintain advanced safety features."
        }
    ];

    const articles = [
        {
            id: 1,
            title: "The Complete Guide to Turbocharger Maintenance",
            category: "Performance",
            author: "Mike Johnson",
            date: "9/15/2024",
            readTime: "8 min",
            description: "Learn essential turbocharger care techniques to maximize performance and longevity of your forced induction system."
        },
        {
            id: 2,
            title: "Understanding Modern ECU Tuning",
            category: "Tuning",
            author: "Sarah Chen",
            date: "9/12/2024",
            readTime: "12 min",
            description: "Dive deep into electronic control unit modifications and how they can transform your vehicle's performance characteristics."
        },
        {
            id: 3,
            title: "Brake System Upgrade Essentials",
            category: "Safety",
            author: "David Rodriguez",
            date: "9/10/2024",
            readTime: "10 min",
            description: "Everything you need to know about upgrading your brake system for improved stopping power and fade resistance."
        }
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching for:", searchQuery);
    };

    const scrollCarousel = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = 400;
            carouselRef.current.scrollBy({
                left: direction === 'right' ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const playVideo = (videoId) => {
        setActiveVideo(videoId);
        
        // Play the video after a small delay to ensure the DOM is updated
        setTimeout(() => {
            const videoElement = videoRefs.current[videoId];
            if (videoElement) {
                videoElement.play().catch(error => {
                    console.error("Error playing video:", error);
                });
            }
        }, 100);
    };

    const closeVideo = () => {
        // Pause all videos before closing
        videoRefs.current.forEach(video => {
            if (video) video.pause();
        });
        setActiveVideo(null);
    };

    // Close video when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (activeVideo && e.target.classList.contains('video-overlay')) {
                closeVideo();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [activeVideo]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-x-hidden">
            {/* Video Modal */}
            {activeVideo && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center video-overlay">
                    <div className="relative w-full max-w-4xl mx-4">
                        <button 
                            onClick={closeVideo}
                            className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <video 
                            ref={el => videoRefs.current[activeVideo] = el}
                            controls 
                            autoPlay 
                            className="w-full rounded-lg"
                            onEnded={closeVideo}
                        >
                            <source src={videos.find(v => v.id === activeVideo)?.video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section className="relative min-h-[80vh] flex items-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/background/bg.png"
                        alt="Automotive technology background"
                        className="w-full h-full opacity-30 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60"></div>
                </div>
                <div className="relative z-10 container mx-auto px-6">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-6">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-8 h-8 text-[#2EB8F4]"
                            >
                                <path d="M12 7v14"></path>
                                <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                            </svg>
                            <span className="text-[#2EB8F4] font-medium tracking-wide">
                                AUTOMORPH EDUCATION
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            Learn About{" "}
                            <span className="text-[#2EB8F4]">
                                Your Car
                            </span>
                        </h1>
                        <p className="text-xl text-muted-foreground text-gray-400 mb-8 leading-relaxed">
                            Master automotive knowledge with expert tutorials, maintenance
                            guides, and upgrade insights. Transform your car expertise from
                            beginner to pro.
                        </p>
                        <form onSubmit={handleSearch} className="flex gap-3 max-w-md">
                            <div className="relative flex-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </svg>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="flex h-12 border-gray-600 w-full rounded-md border px-3 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-12 text-lg border-border/50 bg-card/80 backdrop-blur-sm focus:ring-2 focus:ring-accent"
                                    placeholder="Search topics, guides, tutorials..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="inline-flex bg-[#2EB8F4] items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-12 rounded-md px-8 gradient-accent text-background font-semibold hover:shadow-glow transition-all duration-300"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-20 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20">
                            <BookOpen className="w-5 h-5 text-purple-400" />
                            <span className="text-purple-300 font-medium tracking-wider text-sm">
                                LEARN BY CATEGORY
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black mb-6">
                            Master Every{" "}
                            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Aspect
                            </span>
                        </h2>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                            Explore comprehensive learning categories designed to elevate your automotive expertise
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((category, index) => (
                            <div
                                key={category.id}
                                className={`group relative p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer hover:transform hover:scale-105 hover:${category.glowColor} hover:shadow-2xl`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Gradient overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${category.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                            {category.icon}
                                        </div>
                                        <div className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-slate-300">
                                            {category.articleCount} guides
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors duration-300">
                                        {category.title}
                                    </h3>
                                    <p className="text-slate-400 leading-relaxed mb-6">
                                        {category.description}
                                    </p>

                                    <div className="flex items-center text-blue-400 font-medium group-hover:translate-x-2 transition-transform duration-300">
                                        Explore guides
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Tutorials Section */}
            <section className="py-20 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-cyan-500/10 backdrop-blur-xl border border-green-500/20">
                            <Play className="w-5 h-5 text-green-400" />
                            <span className="text-green-300 font-medium tracking-wider text-sm">
                                VIDEO TUTORIALS
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black mb-6">
                            Watch &{" "}
                            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                                Master
                            </span>
                        </h2>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                            Professional video content with step-by-step guidance from certified automotive experts
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {videos.map((video, index) => (
                            <div
                                key={video.id}
                                className="group bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500 cursor-pointer hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                    {/* Play button */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <button 
                                            onClick={() => playVideo(video.id)}
                                            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-300"
                                        >
                                            <Play className="w-6 h-6 text-white ml-1" />
                                        </button>
                                    </div>

                                    {/* Duration badge */}
                                    <div className="absolute bottom-3 right-3">
                                        <div className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-medium text-white flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {video.duration}
                                        </div>
                                    </div>

                                    {/* Difficulty badge */}
                                    <div className="absolute top-3 left-3">
                                        <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${video.difficulty === 'Beginner' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                                                video.difficulty === 'Intermediate' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                                                    'bg-gradient-to-r from-red-500 to-pink-500'
                                            }`}>
                                            {video.difficulty}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                                        {video.title}
                                    </h3>
                                    <p className="text-slate-400 mb-4 line-clamp-2">
                                        {video.description}
                                    </p>
                                    <div className="flex items-center justify-between text-sm text-slate-400">
                                        <div className="flex items-center gap-1">
                                            <Eye className="w-4 h-4" />
                                            {video.views} views
                                        </div>
                                        <button 
                                            onClick={() => playVideo(video.id)}
                                            className="text-blue-400 font-medium hover:text-blue-300 transition-colors"
                                        >
                                            Watch now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300">
                            View All Tutorials
                        </button>
                    </div>
                </div>
            </section>

            
            {/* EV Car Section */}
            <section className="py-20 relative">
                <div className="container mx-auto px-6">
                    <div className="relative bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 backdrop-blur-2xl p-8 md:p-12 rounded-3xl border border-emerald-500/20 overflow-hidden">
                        {/* Background elements */}
                        <div className="absolute top-0 left-0 w-full h-full">
                            <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-2xl animate-pulse"></div>
                            <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                        </div>
                        
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 backdrop-blur-xl border border-emerald-500/30">
                                    <Leaf className="w-5 h-5 text-emerald-400" />
                                    <span className="text-emerald-300 font-medium tracking-wider text-sm">
                                        FUTURE OF MOBILITY
                                    </span>
                                </div>
                                
                                <h2 className="text-4xl md:text-5xl font-black mb-6">
                                    Explore the World of{" "}
                                    <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                                        Electric Vehicles
                                    </span>
                                </h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <div className="flex items-start gap-3">
                                        <div className="p-3 bg-emerald-500/10 rounded-xl">
                                            <Battery className="w-6 h-6 text-emerald-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-1">Long Range</h3>
                                            <p className="text-slate-300 text-sm">Modern EVs can travel 300+ miles on a single charge</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-3">
                                        <div className="p-3 bg-emerald-500/10 rounded-xl">
                                            <BatteryCharging className="w-6 h-6 text-emerald-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-1">Fast Charging</h3>
                                            <p className="text-slate-300 text-sm">Charge up to 80% in just 30 minutes at fast stations</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-3">
                                        <div className="p-3 bg-emerald-500/10 rounded-xl">
                                            <Leaf className="w-6 h-6 text-emerald-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-1">Eco Friendly</h3>
                                            <p className="text-slate-300 text-sm">Zero emissions and reduced carbon footprint</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <p className="text-lg text-slate-300 mb-8">
                                    Discover how electric vehicles are transforming transportation with cutting-edge technology, 
                                    impressive performance, and sustainable solutions for a greener future.
                                </p>
                                
                                <a 
                                    href="/ev-info" 
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300"
                                >
                                    <Zap className="w-5 h-5" />
                                    Learn More About EVs
                                </a>
                            </div>
                            
                            <div className="flex-1 flex justify-center">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-3xl blur-2xl transform rotate-6 scale-105"></div>
                                    <img 
                                        src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500&h=400&fit=crop" 
                                        alt="Electric Vehicle" 
                                        className="relative z-10 w-full max-w-md rounded-3xl shadow-2xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Articles Carousel Section */}
            <section className="py-20 relative">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                        <div className="text-center md:text-left mb-6 md:mb-0">
                            <h2 className="text-5xl font-black mb-4">
                                Latest{" "}
                                <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                                    Articles
                                </span>
                            </h2>
                            <p className="text-slate-300 text-xl">
                                Expert insights and comprehensive guides from industry professionals
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => scrollCarousel('left')}
                                className="w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-300"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => scrollCarousel('right')}
                                className="w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-300"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-hidden">
                        <div ref={carouselRef} className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide scroll-smooth">
                            {articles.map((article, index) => (
                                <div key={article.id} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3">
                                    <div className="group bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500 cursor-pointer hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10 h-full">
                                        <div className="relative h-48 bg-gradient-to-br from-orange-500/20 to-pink-500/20 overflow-hidden">
                                            <div className="absolute top-4 left-4">
                                                <div className="px-3 py-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-xs font-medium text-white">
                                                    {article.category}
                                                </div>
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-pink-500/10 group-hover:from-orange-500/20 group-hover:to-pink-500/20 transition-all duration-500"></div>
                                        </div>

                                        <div className="p-6">
                                            <h3 className="text-xl font-bold mb-3 group-hover:text-orange-400 transition-colors duration-300 line-clamp-2">
                                                {article.title}
                                            </h3>
                                            <p className="text-slate-400 mb-4 line-clamp-3">
                                                {article.description}
                                            </p>

                                            <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1">
                                                        <User className="w-4 h-4" />
                                                        {article.author}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {article.date}
                                                    </div>
                                                </div>
                                                <span className="text-orange-400 font-medium">
                                                    {article.readTime}
                                                </span>
                                            </div>

                                            <div className="flex items-center text-orange-400 font-medium group-hover:translate-x-2 transition-transform duration-300">
                                                Read article
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 relative">
                <div className="container mx-auto px-6">
                    <div className="relative bg-gradient-to-br from-white/5 to-white/5 backdrop-blur-2xl p-12 md:p-16 rounded-3xl border border-white/10 text-center overflow-hidden">
                        {/* Animated background elements */}
                        <div className="absolute top-0 left-0 w-full h-full">
                            <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
                            <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-5xl md:text-6xl font-black mb-6">
                                Ready to Transform{" "}
                                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    Your Ride?
                                </span>
                            </h2>
                            <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto">
                                Upload your vehicle image and receive AI-powered, personalized upgrade recommendations
                                tailored to your car's specifications and performance goals.
                            </p>

                            <button className="px-10 py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 relative overflow-hidden group">
                                <a href="/tryUs" className="relative z-10 flex items-center gap-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    Upload Your Car
                                </a>
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .animate-gradient-x {
                    background-size: 200% 200%;
                    animation: gradient-x 3s ease infinite;
                }
                
                @keyframes gradient-x {
                    0%, 100% {
                    background-position: 0% 50%;
                    }
                    50% {
                    background-position: 100% 50%;
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out;
                }
                
                @keyframes fade-in {
                    from {
                    opacity: 0;
                    transform: translateY(20px);
                    }
                    to {
                    opacity: 1;
                    transform: translateY(0);
                    }
                }
                
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default EducationHub;