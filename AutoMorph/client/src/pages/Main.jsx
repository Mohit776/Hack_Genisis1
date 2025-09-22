import React from "react"
import { useState, useCallback } from "react"
import { Upload, Zap, ShoppingCart, Car, Cpu, Sparkles, CheckCircle, AlertCircle } from "lucide-react"

// Button component
const Button = ({ children, className = "", disabled = false, onClick, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

// Card components
const Card = ({ children, className = "", ...props }) => {
  return (
    <div className={`rounded-lg border ${className}`} {...props}>
      {children}
    </div>
  )
}

const CardContent = ({ children, className = "", ...props }) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export default function HomePage() {
  const [uploadedImage, setUploadedImage] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const [predictionResult, setPredictionResult] = useState(null)
  const [isPredicting, setIsPredicting] = useState(false)
  const [error, setError] = useState("")
  const [currentStep, setCurrentStep] = useState(1)

  const handleFileSelect = useCallback((event) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result)
        setUploadedFile(file)
        setPredictionResult(null)
        setError("")
        setCurrentStep(2)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleDragOver = useCallback((event) => {
    event.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((event) => {
    event.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((event) => {
    event.preventDefault()
    setIsDragOver(false)
    const file = event.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result)
        setUploadedFile(file)
        setPredictionResult(null)
        setError("")
        setCurrentStep(2)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handlePredict = async () => {
    if (!uploadedFile) {
      setError("Please select an image first")
      return
    }

    setIsPredicting(true)
    setError("")

    const formData = new FormData()
    formData.append("image", uploadedFile)

    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()

      console.log("Backend response:", data) // Debug log

      if (!res.ok) {
        setError(data.error || "Something went wrong with prediction")
      } else {
        setPredictionResult(data)
        setCurrentStep(3)
      }
    } catch (err) {
      console.error("Fetch error:", err)
      setError("Backend not reachable. Please ensure the ML server is running.")
    }

    setIsPredicting(false)
  }

  const handleGenerate = useCallback(() => {
    if (!uploadedImage) return
    setIsGenerating(true)
    // Simulate AI 3D model generation
    setTimeout(() => {
      setIsGenerating(false)
      setCurrentStep(3)
    }, 3000)
  }, [uploadedImage])

  const getModificationPrice = (mod) => {
    const prices = {
      "spoiler": "$1,299",
      "wheel": "$2,499",
      "rim": "$2,499",
      "exhaust": "$899",
      "suspension": "$1,599",
      "brake": "$1,199",
      "turbo": "$3,999",
      "intake": "$699",
      "light": "$899",
      "wrap": "$599",
      "stripe": "$599",
      "tint": "$399"
    }

    for (let key in prices) {
      if (mod.toLowerCase().includes(key)) {
        return prices[key]
      }
    }
    return "$999"
  }

  const getModificationCategory = (mod) => {
    const categories = {
      "spoiler": "Aerodynamics",
      "wheel": "Wheels",
      "rim": "Wheels",
      "exhaust": "Performance",
      "suspension": "Performance",
      "brake": "Performance",
      "turbo": "Performance",
      "intake": "Performance",
      "light": "Lighting",
      "wrap": "Aesthetics",
      "stripe": "Aesthetics",
      "tint": "Aesthetics"
    }

    for (let key in categories) {
      if (mod.toLowerCase().includes(key)) {
        return categories[key]
      }
    }
    return "Custom"
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Custom CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes scan {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
      `}</style>

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black"></div>

        {/* Animated Grid Lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,rgba(59,130,246,0.3)_25px,rgba(59,130,246,0.3)_26px,transparent_27px,transparent_49px,rgba(59,130,246,0.3)_50px,rgba(59,130,246,0.3)_51px,transparent_52px),linear-gradient(rgba(59,130,246,0.3)_1px,transparent_1px)] bg-[50px_50px] animate-pulse"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Circuit Pattern */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 opacity-10">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <path
              d="M20,20 L180,20 L180,60 L140,60 L140,100 L180,100 L180,180 L20,180 Z"
              stroke="url(#circuit-gradient)"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
            />
          </svg>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI Car Classifier & Modifier
          </h1>
          <div className="flex items-center space-x-4">
            <Button className="bg-gray-800 hover:bg-gray-700 border border-gray-700">
              Settings
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart
            </Button>
          </div>
        </div>
      </header>

      {/* Step Guide */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 mb-12 pt-12">
        <div className="flex items-center justify-center space-x-8 text-sm">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-700'} flex items-center justify-center text-xs font-bold`}>
              {currentStep > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
            </div>
            <span className={currentStep >= 1 ? 'text-blue-300' : 'text-gray-400'}>Upload</span>
          </div>
          <div className={`w-12 h-0.5 ${currentStep >= 2 ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-700'}`}></div>
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-700 border-2 border-gray-600'} flex items-center justify-center text-xs font-bold`}>
              {currentStep > 2 ? <CheckCircle className="w-5 h-5" /> : '2'}
            </div>
            <span className={currentStep >= 2 ? 'text-blue-300' : 'text-gray-400'}>Analyze</span>
          </div>
          <div className={`w-12 h-0.5 ${currentStep >= 3 ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-700'}`}></div>
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-700 border-2 border-gray-600'} flex items-center justify-center text-xs font-bold`}>
              {currentStep > 3 ? <CheckCircle className="w-5 h-5" /> : '3'}
            </div>
            <span className={currentStep >= 3 ? 'text-blue-300' : 'text-gray-400'}>Upgrade</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Upload Section */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Transform Your Ride
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Upload your car image for AI classification and personalized upgrades
              </p>
            </div>

            {/* Upload Area */}
            <div
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${isDragOver
                  ? "border-blue-400 bg-blue-500/10 scale-105"
                  : uploadedImage
                    ? "border-green-400 bg-green-500/10"
                    : "border-gray-600 bg-gray-900/50 hover:border-blue-500 hover:bg-blue-500/5"
                }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              {uploadedImage ? (
                <div className="space-y-4">
                  <img
                    src={uploadedImage}
                    alt="Uploaded car"
                    className="max-w-full max-h-48 mx-auto rounded-lg shadow-2xl"
                  />
                  <p className="text-green-400 font-semibold">✓ Image uploaded successfully</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold mb-2">Drop your car image here</p>
                    <p className="text-gray-400">or click to browse files</p>
                  </div>
                </div>
              )}

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handlePredict}
                disabled={!uploadedImage || isPredicting || predictionResult}
                className="flex-1 h-14 flex items-center justify-center cursor-pointer text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed border-0 shadow-lg shadow-green-500/25"
              >
                {isPredicting ? (
                  <>
                    <Cpu className="w-5 h-5 mr-2 animate-spin" />
                    Classifying Car...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Classify Car
                  </>
                )}
              </Button>

              <Button
                onClick={handleGenerate}
                disabled={!predictionResult || isGenerating}
                className="flex-1 h-14 flex items-center justify-center cursor-pointer text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed border-0 shadow-lg shadow-blue-500/25"
              >
                {isGenerating ? (
                  <>
                    <Cpu className="w-5 h-5 mr-2 animate-spin" />
                    Generating 3D Model...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Generate 3D Model
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Right Side - Results & Preview */}
          <div className="space-y-8">
            {/* Prediction Results */}
            {predictionResult && (
              <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-green-500/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-green-400 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Car Classification Results
                  </h3>
                  
                  {predictionResult.car_prediction && (
                    <div className="space-y-3 text-sm mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Make:</span>
                        <span className="font-semibold text-blue-300">{predictionResult.car_prediction.make || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Model:</span>
                        <span className="font-semibold text-blue-300">{predictionResult.car_prediction.model || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Variant:</span>
                        <span className="font-semibold text-blue-300">{predictionResult.car_prediction.variant || "N/A"}</span>
                      </div>
                      {/* <div className="flex justify-between items-center">
                        <span className="text-gray-400">Confidence:</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                              style={{ width: `${(predictionResult.car_prediction.confidence || 0) * 100}%` }}
                            ></div>
                          </div>
                          <span className="font-semibold text-green-400">
                            {((predictionResult.car_prediction.confidence || 0) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div> */}
                    </div>
                  )}

                  {/* Modifications Section - Fixed */}
                  <div className="p-4 bg-gray-800/50 rounded border border-gray-700">
                    <h3 className="font-semibold text-lg mb-3 text-yellow-400">Recommended Modifications</h3>
                    {predictionResult.modifications && predictionResult.modifications.length > 0 ? (
                      <ul className="space-y-2">
                        {predictionResult.modifications.map((mod, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-yellow-400 mr-2">•</span>
                            <span className="text-sm text-gray-300">{mod}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-sm italic">
                        No modifications data received. Check console for backend response.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 3D Model Preview */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4 text-center">3D Model Preview</h3>
                <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {isGenerating ? (
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-blue-400">Generating your 3D model...</p>
                    </div>
                  ) : predictionResult ? (
                    <div className="text-center">
                      <Car className="w-24 h-24 mx-auto mb-4 text-blue-400" />
                      <p className="text-gray-400">Click Generate to create 3D model</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center">
                        <Car className="w-12 h-12 text-gray-600" />
                      </div>
                      <p className="text-3xl text-gray-500">Coming Soon</p>
                    </div>
                  )}
                  {/* Scanning Animation */}
                  {(isGenerating || isPredicting) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-scan"></div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Recommendations Section */}
        {predictionResult && predictionResult.modifications && predictionResult.modifications.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI-Recommended Modifications
              </h3>
              <p className="text-gray-400">
                Personalized upgrades for your {predictionResult.car_prediction?.make || ""} {predictionResult.car_prediction?.model || ""}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {predictionResult.modifications.slice(0, 4).map((modification, index) => (
                <Card
                  key={index}
                  className="bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:border-blue-500 transition-all duration-300 group"
                >
                  <CardContent className="p-6">
                    <div className="aspect-video bg-gray-800 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                      <Car className="w-16 h-16 text-gray-600 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-blue-400 font-semibold">
                          {getModificationCategory(modification)}
                        </span>
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                      </div>
                      <h4 className="font-bold text-sm">{modification}</h4>
                      <p className="text-2xl font-bold text-green-400">
                        {getModificationPrice(modification)}
                      </p>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0">
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {predictionResult.modifications.length > 4 && (
              <div className="mt-8 text-center">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0">
                  View All {predictionResult.modifications.length} Recommendations
                </Button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating Store Button */}
      <div className="fixed bottom-8 right-8 z-20">
        <Button className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 border-0">
          <ShoppingCart className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}