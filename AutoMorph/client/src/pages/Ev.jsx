import React from "react";
import {
    Zap,
    Leaf,
    ChevronRight,
    Battery,
    Car,
    Clock,
    Star,
    Play,
    Users,
    TrendingDown,
    DollarSign,
    Award,
    MapPin,
    ChevronLeft,
    BookOpen
} from "lucide-react";

const Ev = () => {
    return (
        <div className="bg-slate-900">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900">
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>
                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                    <div className="flex items-center justify-center gap-6 mb-8">
                        <div className="p-4 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl shadow-2xl">
                            <Zap className="w-10 h-10 text-white" />
                        </div>
                        <div className="p-4 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl shadow-2xl">
                            <Leaf className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight">
                        The{" "}
                        <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
                            Electric
                        </span>{" "}
                        Future
                    </h1>
                    <p className="text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                        Discover sustainable transportation that's powerful, efficient, and built for tomorrow.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button className="group bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center gap-3 shadow-2xl hover:shadow-blue-500/25 hover:scale-105">
                            Start Learning
                            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="text-white border-2 border-white/40 hover:border-white/80 px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 backdrop-blur-sm bg-white/10 hover:bg-white/20">
                            Watch Demo
                        </button>
                    </div>
                </div>
            </section>

            {/* Types Section */}
            <section className="py-24 bg-slate-800">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl font-black text-white mb-6">
                            EV Types
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Find the perfect electric vehicle for your lifestyle
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: Battery,
                                title: "Battery Electric",
                                desc: "100% electric power",
                                range: "250-400 miles",
                                color: "from-blue-500 to-purple-500"
                            },
                            {
                                icon: Zap,
                                title: "Hybrid Electric",
                                desc: "Electric + gas engine",
                                range: "500-600 miles",
                                color: "from-emerald-500 to-blue-500"
                            },
                            {
                                icon: Car,
                                title: "Plug-in Hybrid",
                                desc: "Rechargeable hybrid",
                                range: "20-50 miles electric",
                                color: "from-purple-500 to-pink-500"
                            },
                            {
                                icon: Leaf,
                                title: "Fuel Cell",
                                desc: "Hydrogen powered",
                                range: "300-400 miles",
                                color: "from-green-500 to-emerald-500"
                            }
                        ].map((item, i) => (
                            <div key={i} className="group bg-slate-700/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-600/50 hover:border-slate-500 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                                <div className={`mx-auto mb-6 p-4 rounded-2xl bg-gradient-to-r ${item.color} w-fit group-hover:scale-110 transition-transform duration-300`}>
                                    <item.icon className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 text-center">
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 text-center mb-4">
                                    {item.desc}
                                </p>
                                <div className="text-center">
                                    <span className="inline-block bg-slate-600 text-white px-4 py-2 rounded-xl text-sm font-medium">
                                        {item.range}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Resources Section */}
            <section className="py-24 bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl font-black text-white mb-6">
                            Learn More
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Expert guides and insights to help you understand EVs better
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                image: "https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=800",
                                title: "Battery Technology",
                                desc: "Understanding lithium-ion batteries and charging cycles",
                                time: "8 min read",
                                rating: "4.8",
                                type: "Article",
                                icon: BookOpen
                            },
                            {
                                image: "https://images.pexels.com/photos/3164853/pexels-photo-3164853.jpeg?auto=compress&cs=tinysrgb&w=800",
                                title: "EV Maintenance",
                                desc: "Essential tips to keep your electric vehicle running smoothly",
                                time: "12 min watch",
                                rating: "4.9",
                                type: "Video",
                                icon: Play
                            },
                            {
                                image: "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=800",
                                title: "Buying Guide",
                                desc: "Complete guide to choosing your first electric vehicle",
                                time: "15 min read",
                                rating: "4.7",
                                type: "Guide",
                                icon: Users
                            }
                        ].map((item, i) => (
                            <div key={i} className="group bg-slate-700/30 backdrop-blur-md rounded-3xl overflow-hidden border border-slate-600/30 hover:border-slate-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                    <div className="absolute top-4 left-4">
                                        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2">
                                            <item.icon className="w-4 h-4 text-white" />
                                            <span className="text-sm font-medium text-white">{item.type}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-white mb-4">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-300 mb-6 leading-relaxed">
                                        {item.desc}
                                    </p>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Clock className="w-4 h-4" />
                                            <span className="text-sm">{item.time}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="text-sm text-white">{item.rating}</span>
                                        </div>
                                    </div>
                                    <button className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                                        Read More
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-24 bg-slate-800">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl font-black text-white mb-6">
                            Why Go{" "}
                            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                                Electric?
                            </span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            The advantages that make electric vehicles the smart choice
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        {[
                            {
                                icon: TrendingDown,
                                title: "Lower Costs",
                                stat: "60%",
                                subtitle: "Less than gas",
                                color: "from-green-500 to-emerald-500",
                                points: ["$0.10/mile vs $0.25", "No oil changes", "Fewer repairs"]
                            },
                            {
                                icon: Leaf,
                                title: "Zero Emissions",
                                stat: "100%",
                                subtitle: "Clean energy",
                                color: "from-blue-500 to-cyan-500",
                                points: ["No tailpipe emissions", "50% less CO2", "Cleaner air"]
                            },
                            {
                                icon: DollarSign,
                                title: "Tax Credits",
                                stat: "$7,500",
                                subtitle: "Federal incentive",
                                color: "from-purple-500 to-indigo-500",
                                points: ["Federal credits", "State rebates", "Utility incentives"]
                            },
                            {
                                icon: Zap,
                                title: "Performance",
                                stat: "100%",
                                subtitle: "Instant torque",
                                color: "from-orange-500 to-red-500",
                                points: ["Instant acceleration", "Silent operation", "Smooth driving"]
                            }
                        ].map((item, i) => (
                            <div key={i} className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                <div className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <item.icon className="w-10 h-10 text-white" />
                                </div>
                                <div className="text-center mb-6">
                                    <div className="text-4xl font-black text-gray-900 mb-2">{item.stat}</div>
                                    <div className={`text-lg font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                                        {item.subtitle}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    {item.title}
                                </h3>
                                <div className="space-y-3">
                                    {item.points.map((point, j) => (
                                        <div key={j} className="flex items-center gap-3">
                                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color}`}></div>
                                            <span className="text-gray-700 font-medium">{point}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-12 text-center border border-slate-700">
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <div className="p-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl">
                                <Award className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-4xl font-black text-white">
                                Ready to Switch?
                            </h3>
                        </div>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Join the electric revolution and experience the future of transportation
                        </p>
                        <button className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl hover:scale-105">
                            Explore EVs
                        </button>
                    </div>
                </div>
            </section>

            {/* Charging Section */}
            <section className="py-20 bg-slate-900">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-black text-white mb-6">
                            Find Charging Stations
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Locate nearby charging stations and plan your electric journey
                        </p>
                    </div>
                    <div className="bg-slate-800 rounded-3xl overflow-hidden border border-slate-700">
                        <div className="relative h-96">
                            <img
                                alt="Interactive charging station map"
                                className="w-full h-full object-cover opacity-50"
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/interactive-map-with-ev-charging-stations-UnJ3ogsfytCEmgAvkAmuIf96PM9oZA.jpg"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-800/40 to-slate-900/80 flex items-center justify-center">
                                <div className="text-center text-white">
                                    <MapPin className="h-16 w-16 mx-auto mb-6 text-blue-400" />
                                    <h3 className="text-3xl font-bold mb-4">
                                        Interactive Map
                                    </h3>
                                    <p className="text-xl opacity-90">
                                        Find charging stations near you
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Ev