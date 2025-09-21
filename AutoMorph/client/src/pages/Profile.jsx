import { motion } from "framer-motion";
import { 
  Battery, Settings, Zap, Thermometer, Gauge, Activity, 
  Car, Calendar, Fuel, DollarSign, Wrench, Clock, 
  AlertTriangle, CheckCircle, Lightbulb, TrendingUp, 
  Shield, ExternalLink, Star, Edit, User, Mail 
} from "lucide-react";
import electricCar from "../assets/assets/electric-car.jpg";
import profileAvatar from "../assets/assets/profile-avatar.png";

const Profile = () => {
  const healthItems = [
    { name: "Battery", icon: Battery, status: "excellent", value: "92%", color: "text-green-400" },
    { name: "Engine", icon: Settings, status: "good", value: "87%", color: "text-blue-400" },
    { name: "Tires", icon: Gauge, status: "good", value: "85%", color: "text-blue-400" },
    { name: "Temperature", icon: Thermometer, status: "warning", value: "78%", color: "text-yellow-400" },
    { name: "Electrical", icon: Zap, status: "excellent", value: "94%", color: "text-green-400" },
    { name: "Performance", icon: Activity, status: "excellent", value: "91%", color: "text-green-400" },
  ];

  const maintenanceHistory = [
    { id: 1, date: "March 15, 2024", service: "Oil Change & Multi-Point Inspection", cost: 89, mileage: "12,250 mi", status: "completed", description: "Full synthetic oil change, tire rotation, brake inspection" },
    { id: 2, date: "February 8, 2024", service: "Brake Pad Replacement", cost: 340, mileage: "11,800 mi", status: "completed", description: "Front brake pads replaced, rotors resurfaced" },
    { id: 3, date: "January 20, 2024", service: "Battery Health Check", cost: 0, mileage: "11,400 mi", status: "completed", description: "Battery diagnostic test - excellent condition" },
    { id: 4, date: "December 5, 2023", service: "Winter Tire Installation", cost: 120, mileage: "10,900 mi", status: "completed", description: "Winter tire changeover and wheel balancing" },
    { id: 5, date: "April 15, 2024", service: "Scheduled Maintenance", cost: 0, mileage: "12,800 mi (est.)", status: "upcoming", description: "Oil change, filter replacement, general inspection" }
  ];

  const recommendations = [
    { id: 1, type: "upgrade", icon: TrendingUp, title: "Performance Chip Upgrade", description: "Boost your Tesla's performance by 15% with our certified upgrade package.", priority: "high", estimated_benefit: "+50hp", color: "text-blue-400" },
    { id: 2, type: "maintenance", icon: Shield, title: "Ceramic Coating", description: "Protect your paint with professional-grade ceramic coating that lasts 5+ years.", priority: "medium", estimated_benefit: "5yr protection", color: "text-green-400" },
    { id: 3, type: "tip", icon: Lightbulb, title: "Battery Optimization", description: "Learn advanced charging techniques to extend battery life by 20%.", priority: "low", estimated_benefit: "+20% lifespan", color: "text-purple-400" },
    { id: 4, type: "upgrade", icon: Zap, title: "Fast Charging Kit", description: "Upgrade to 250kW charging capability for 40% faster charging speeds.", priority: "high", estimated_benefit: "40% faster", color: "text-blue-400" }
  ];

  const tutorials = [
    { title: "EV Charging Best Practices", duration: "8 min read", rating: 4.8 },
    { title: "Tesla Autopilot Safety Guide", duration: "12 min read", rating: 4.9 },
    { title: "Winter Driving Tips for EVs", duration: "6 min read", rating: 4.7 }
  ];

  const RecommendationsWidget = () => (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }} className="glass-card glow-hover h-full shadow-lg shadow-blue-500/20">
      <div className="space-y-6 bg-[#232A39] p-5 rounded-4xl border-2 border-gray-500 text-white">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-blue-400" />
          <h3 className="text-xl font-semibold text-white">Smart Recommendations</h3>
        </div>

        <div className="h-64 pr-4 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700 scrollbar-thumb-rounded-full">
          {recommendations.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-300
                ${item.priority === 'high' ? 'bg-blue-500/10 border-blue-500/30 hover:border-blue-500/50' :
                  item.priority === 'medium' ? 'bg-green-500/10 border-green-500/30 hover:border-green-500/50' :
                  'bg-purple-500/10 border-purple-500/30 hover:border-purple-500/50'}`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center
                  ${item.priority === 'high' ? 'bg-blue-500/20' :
                    item.priority === 'medium' ? 'bg-green-500/20' : 'bg-purple-500/20'}`}
                >
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-white text-sm">{item.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold
                      ${item.priority === 'high' ? 'bg-blue-500/20 text-blue-400' :
                        item.priority === 'medium' ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-400'}`}
                    >
                      {item.estimated_benefit}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="pt-4 space-y-4 border-t border-gray-600">
          <h4 className="font-semibold text-white text-sm flex items-center gap-2">
            <Star className="w-4 h-4 text-purple-400" />
            Featured Tutorials
          </h4>
          <div className="space-y-2">
            {tutorials.map((tutorial, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-all duration-300 cursor-pointer group"
              >
                <div>
                  <p className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                    {tutorial.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">{tutorial.duration}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs text-gray-400">{tutorial.rating}</span>
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <button className="flex items-center justify-center w-full px-4 py-2 border rounded-md border-blue-500/30 hover:bg-blue-500/10 hover:border-blue-500/50 text-blue-400 group">
            <Lightbulb className="w-4 h-4 mr-2 group-hover:animate-pulse" />
            View All Recommendations
          </button>
        </motion.div>
      </div>
    </motion.div>
  );

  const UserInfo = () => (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }} className="glass-card glow-hover h-full shadow-lg shadow-blue-500/20">
      <div className="flex flex-col items-center bg-[#222837] space-y-6 p-5 h-[80vh] rounded-4xl text-white border-2 border-gray-600">
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-blue-500 shadow-lg shadow-blue-500/30">
            <img src={profileAvatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <motion.div
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50"
          >
            <User className="w-4 h-4 text-white" />
          </motion.div>
        </motion.div>

        <div className="text-center space-y-3 flex-1">
          <h2 className="text-2xl font-bold text-white">Alex Rivera</h2>
          <div className="space-y-2 text-gray-400">
            <div className="flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              <span>alex.rivera@automorph.com</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Member since Jan 2024</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-600">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">47</p>
              <p className="text-xs text-gray-300">Services</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">85%</p>
              <p className="text-xs text-gray-300">Health Score</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">12K</p>
              <p className="text-xs text-gray-300">Miles</p>
            </div>
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
          <button className="flex bg-blue-500 rounded-4xl items-center justify-center w-full px-4 py-2 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30 group">
            <Edit className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
            Edit Profile
          </button>
        </motion.div>
      </div>
    </motion.div>
  );

  const MaintenanceHistory = () => (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }} className="glass-card glow-hover h-full shadow-lg shadow-blue-500/20">
      <div className="space-y-6 bg-[#222837] text-white border-2 rounded-4xl border-gray-500 p-5 h-[96vh]">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" />
            Maintenance History
          </h3>
          <div className="text-sm text-gray-400">Last 6 months</div>
        </div>

        <div className="h-[70vh] pr-4 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700 scrollbar-thumb-rounded-full">
          {maintenanceHistory.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative"
            >
              {index < maintenanceHistory.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-gradient-to-b from-blue-500 to-transparent" />
              )}

              <div className={`flex gap-4 p-4 rounded-xl border transition-all duration-300 hover:shadow-lg
                ${item.status === 'completed' ? 'bg-green-500/10 border-green-500/20 hover:border-green-500/40 hover:shadow-green-500/20' :
                  'bg-yellow-500/10 border-yellow-500/20 hover:border-yellow-500/40 hover:shadow-yellow-500/20'}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 z-10
                  ${item.status === 'completed' ? 'bg-green-500/20 border-green-500 text-green-400' :
                    'bg-yellow-500/20 border-yellow-400 text-yellow-400'}`}
                >
                  {item.status === 'completed' ? <CheckCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-white">{item.service}</h4>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                    {item.cost > 0 && (
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold
                        ${item.status === 'completed' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'}`}
                      >
                        <DollarSign className="w-3 h-3" />${item.cost}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Wrench className="w-3 h-3" />
                      {item.mileage}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-600">
          <div className="text-center">
            <p className="text-lg font-bold text-blue-400">5</p>
            <p className="text-xs text-gray-400">Total Services</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-green-400">$549</p>
            <p className="text-xs text-gray-400">Total Spent</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-purple-400">647mi</p>
            <p className="text-xs text-gray-400">Avg. Interval</p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const CarHealthOverview = () => (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }} className="glass-card glow-hover h-full shadow-lg shadow-blue-500/20">
      <div className="space-y-6 bg-[#232A39] p-5 rounded-4xl border-2 border-gray-500 text-white">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" />
            Car Health Overview
          </h3>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            85% Overall
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {healthItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg
                ${item.status === 'excellent' ? 'hover:shadow-green-500/30 border-green-500/30' :
                  item.status === 'good' ? 'hover:shadow-blue-500/30 border-blue-500/30' :
                  item.status === 'warning' ? 'hover:shadow-yellow-500/30 border-yellow-500/30' : 'hover:shadow-red-500/30 border-red-500/30'}`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span className={`text-lg font-bold ${item.color}`}>{item.value}</span>
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{item.name}</p>
                  <p className={`text-xs capitalize ${item.color}`}>{item.status}</p>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: item.value }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-1 rounded-full transition-all duration-300
                      ${item.status === 'excellent' ? 'bg-green-400' :
                        item.status === 'good' ? 'bg-blue-400' :
                        item.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'}`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-600">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 p-3 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm font-semibold transition-all shadow-md hover:shadow-blue-500/20"
          >
            Run Diagnostics
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 p-3 rounded-lg bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-semibold transition-all shadow-md hover:shadow-green-500/20"
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const CarInfo = () => (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }} className="glass-card glow-hover h-full shadow-lg shadow-blue-500/20">
      <div className="space-y-6 bg-[#222837] p-5 rounded-4xl border-2 border-gray-600 text-white">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <Car className="w-5 h-5 text-blue-400" />
            My Vehicle
          </h3>
          <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.3 }}>
            <Settings className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors cursor-pointer" />
          </motion.div>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="relative overflow-hidden rounded-xl shadow-lg">
          <img src={electricCar} alt="Tesla Model S" className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h4 className="text-xl font-bold">Tesla Model S</h4>
            <p className="text-sm opacity-90">Plaid Edition</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-400">Year</span>
            </div>
            <p className="text-lg font-semibold text-white">2023</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-400">Mileage</span>
            </div>
            <p className="text-lg font-semibold text-white">12,547 mi</p>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-gray-600">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">VIN</span>
            <span className="text-sm font-mono text-white">5YJ3E1EA*</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">License Plate</span>
            <span className="text-sm font-semibold text-white">MORPH-01</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <Fuel className="w-3 h-3" />
              Battery Level
            </span>
            <span className="text-sm font-semibold text-green-400">92%</span>
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <button className="w-full bg-gray-800 text-blue-400 px-4 py-2 border rounded-2xl border-blue-500/30 hover:bg-blue-500/10 hover:border-blue-500/50 transition-colors shadow-md hover:shadow-blue-500/20">
            View Full Details
          </button>
        </motion.div>
      </div>
    </motion.div>
  );

  const MaintenanceCard = () => (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }} className="glass-card glow-hover h-full shadow-lg shadow-blue-500/20">
      <div className="space-y-6 bg-[#232A39] p-5 text-white rounded-4xl border-2 border-gray-600">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-400" />
          <h3 className="text-xl font-semibold text-white">Maintenance</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 shadow-md">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white">Last Service</p>
              <p className="text-sm text-gray-400">March 15, 2024</p>
              <p className="text-xs text-green-400">Oil Change & Inspection</p>
            </div>
          </div>

          <motion.div
            animate={{ boxShadow: ["0 0 0px rgba(245,158,11,0.5)", "0 0 20px rgba(245,158,11,0.5)", "0 0 0px rgba(245,158,11,0.5)"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 shadow-md"
          >
            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white">Next Service</p>
              <p className="text-sm text-gray-400">April 15, 2024</p>
              <p className="text-xs text-yellow-400">In 8 days</p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-600">
          <div className="text-center p-3 rounded-lg bg-blue-500/10 shadow-md">
            <p className="text-2xl font-bold text-blue-400">2.5K</p>
            <p className="text-xs text-gray-400">Miles since</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-purple-500/10 shadow-md">
            <p className="text-2xl font-bold text-purple-400">$347</p>
            <p className="text-xs text-gray-400">Total cost</p>
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <button className="flex items-center justify-center w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md group shadow-lg shadow-blue-500/30">
            <Clock className="w-4 h-4 mr-2 group-hover:animate-spin" />
            Schedule Maintenance
          </button>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#0E1626] p-4 md:p-6 lg:p-8">
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thumb-blue-500::-webkit-scrollbar-thumb {
          background-color: #3b82f6;
          border-radius: 10px;
        }
        .scrollbar-track-gray-700::-webkit-scrollbar-track {
          background-color: #374151;
          border-radius: 10px;
        }
        .scrollbar-thumb-rounded-full::-webkit-scrollbar-thumb {
          border-radius: 10px;
        }
      `}</style>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl pt-18 mx-auto space-y-6"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-4">
            AutoMorph Dashboard
          </h1>
          <p className="text-gray-500 text-lg">Your personalized automotive intelligence center</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <UserInfo />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <CarInfo />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
            <MaintenanceCard />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="lg:col-span-2">
            <CarHealthOverview />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="xl:col-span-2">
            <MaintenanceHistory />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}>
            <RecommendationsWidget />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;