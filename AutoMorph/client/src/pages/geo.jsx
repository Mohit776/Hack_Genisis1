import React, { useEffect, useRef, useState } from 'react';
import TextType from '../components/TextType';

const Geo = () => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    // const [searchQuery, setSearchQuery] = useState('');
    // const [selectedType, setSelectedType] = useState('all');
    const [userLocation, setUserLocation] = useState(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    const garages = [
        { name: "Green Garage", lat: 28.6271, lng: 77.2155, type: "premium", rating: 4.8 },
        { name: "Happy Wheels Garage", lat: 28.6123, lng: 77.2295, type: "standard", rating: 4.2 },
        { name: "Motor Lovers Garage", lat: 28.6452, lng: 77.2001, type: "premium", rating: 4.9 },
        { name: "Tasty Motors Garage", lat: 28.7046, lng: 77.1910, type: "standard", rating: 3.9 },
        { name: "The Giving Garage", lat: 28.5921, lng: 77.2517, type: "budget", rating: 4.0 },
        { name: "Helping Hands Garage", lat: 28.6290, lng: 77.3021, type: "premium", rating: 4.7 },
        { name: "Community Garage", lat: 28.6721, lng: 77.1203, type: "budget", rating: 4.1 },
        { name: "Happy Rides Garage", lat: 28.5312, lng: 77.2049, type: "standard", rating: 4.3 },
        { name: "The Auto Bank", lat: 28.6421, lng: 77.2017, type: "premium", rating: 4.8 },
        { name: "Givers' Garage", lat: 28.7211, lng: 77.2910, type: "budget", rating: 3.8 },
        { name: "LifeSavers Garage", lat: 28.5650, lng: 77.2452, type: "premium", rating: 4.9 },
        { name: "Hope Garage", lat: 28.6317, lng: 77.2999, type: "standard", rating: 4.4 },
        { name: "Kind Hearts Garage", lat: 28.6921, lng: 77.1841, type: "premium", rating: 4.7 },
        { name: "Well Fed Motors", lat: 28.5295, lng: 77.2161, type: "budget", rating: 4.0 },
        { name: "Good Wheels", lat: 28.6031, lng: 77.1852, type: "standard", rating: 4.2 },
        { name: "The Drive Givers", lat: 28.6890, lng: 77.2512, type: "premium", rating: 4.8 },
        { name: "The Warm Engine Project", lat: 28.7041, lng: 77.1025, type: "budget", rating: 3.7 },
        { name: "City Car Rescue", lat: 28.5902, lng: 77.1738, type: "standard", rating: 4.5 }
    ];

    useEffect(() => {
        // Load Leaflet CSS dynamically
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);

        // Load Leaflet JS dynamically
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.async = true;
        script.onload = initializeMap;
        document.head.appendChild(script);

        return () => {
            // Clean up
            if (mapInstance.current) {
                mapInstance.current.remove();
            }
        };
    }, []);

    const initializeMap = () => {
        // Check if Leaflet is loaded
        if (typeof L === 'undefined') {
            console.error('Leaflet not loaded yet');
            return;
        }

        // Initialize map
        mapInstance.current = L.map(mapRef.current).setView([28.6139, 77.2090], 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(mapInstance.current);

        // Add custom icon for garages
        const garageIcon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        // Add custom icon for user location
        const userIcon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        // Add markers for each garage
        garages.forEach(garage => {
            const marker = L.marker([garage.lat, garage.lng], { icon: garageIcon })
                .addTo(mapInstance.current)
                .bindPopup(`
                    <div class="popup-content">
                        <h3 class="font-bold text-lg">${garage.name}</h3>
                        <p class="text-sm">Type: ${garage.type}</p>
                        <p class="text-sm">Rating: ${garage.rating}/5</p>
                        
                    </div>
                `);

            // <button class="bg-blue-500 text-white px-3 py-1 rounded mt-2 text-sm" onclick="alert('Directions to ${garage.name}')">
            //             Get Directions
            // </button>

            // Store reference to marker for filtering
            garage.marker = marker;
        });

        // Locate user
        mapInstance.current.locate({ setView: true, maxZoom: 14 });

        const onLocationFound = (e) => {
            setUserLocation(e.latlng);
            L.marker(e.latlng, { icon: userIcon })
                .addTo(mapInstance.current)
                .bindPopup("<b>You are here</b>")
                .openPopup();
        };

        mapInstance.current.on('locationfound', onLocationFound);

        // Handle location error
        const onLocationError = (e) => {
            console.error('Location access denied or failed:', e.message);
            // Set default location if user location is not available
            setUserLocation({ lat: 28.6139, lng: 77.2090 });
        };

        mapInstance.current.on('locationerror', onLocationError);

        setIsMapLoaded(true);
    };

    // Filter garages based on search query and type - COMMENTED OUT SEARCH FUNCTIONALITY
    // const filteredGarages = garages.filter(garage => {
    //     const matchesSearch = garage.name.toLowerCase().includes(searchQuery.toLowerCase());
    //     const matchesType = selectedType === 'all' || garage.type === selectedType;
    //     return matchesSearch && matchesType;
    // });

    // Function to focus map on a specific garage
    // const focusOnGarage = (garage) => {
    //     if (mapInstance.current && garage.marker) {
    //         mapInstance.current.setView([garage.lat, garage.lng], 15);
    //         garage.marker.openPopup();
    //     }
    // };

    // Function to calculate distance between two points
    const calculateDistance = (lat1, lng1, lat2, lng2) => {
        const R = 6371; // Earth's radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return (R * c).toFixed(1); // Distance in km
    };

    // Get nearest 5 garages based on user location
    const getNearestGarages = () => {
        if (!userLocation) return garages.slice(0, 5); // Return first 5 if no user location

        const garagesWithDistance = garages.map(garage => ({
            ...garage,
            distance: calculateDistance(userLocation.lat, userLocation.lng, garage.lat, garage.lng)
        }));

        return garagesWithDistance
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 3);
    };

    const filteredGarages = getNearestGarages();

    return (
        <div className="bg-gray-900 pt-24 text-white min-h-screen">
            <header className="bg-gray-900 text-white text-center py-12 flex flex-col gap-4">
                <TextType
                    text={["Find Nearest Our Service Centres", "Find Nearest Garages", "24/7 Open"]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="|"
                    className='text-4xl font-bold'
                />
                <TextType
                    text={["Locate Nearby Garages To Upgrade your car", "Enhance your Car", "Standout Your car"]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="|"
                    className='text-xl'
                />
            </header>

            <section className="container mx-auto py-8 px-4">
                {/* Search and filter section - COMMENTED OUT */}
                {/* <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                placeholder="Search for garages..."
                                className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <svg className="absolute right-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        
                        <select
                            className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            <option value="all">All Types</option>
                            <option value="premium">Premium</option>
                            <option value="standard">Standard</option>
                            <option value="budget">Budget</option>
                        </select>
                        
                        <button 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                            onClick={() => mapInstance.current.locate({ setView: true, maxZoom: 14 })}
                        >
                            Locate Me
                        </button>
                    </div>
                </div> */}

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Map container */}
                    <div className="lg:w-2/3">
                        <div
                            ref={mapRef}
                            id="map"
                            style={{ height: '600px', width: '100%', borderRadius: '12px' }}
                            className="shadow-xl"
                        ></div>

                        {!isMapLoaded && (
                            <div className="mt-4 p-4 bg-gray-800 rounded-lg text-center">
                                <p className="text-gray-300">Loading map...</p>
                            </div>
                        )}
                    </div>

                    {/* Garage list - Limited to nearest 5 */}
                    <div className="lg:w-1/3 bg-gray-800 p-6 rounded-lg shadow-lg h-fit overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4 text-white">Nearest 3 Garages</h2>
                        <p className="text-gray-400 text-sm mb-4">{filteredGarages.length} nearest garages</p>

                        {filteredGarages.length === 0 ? (
                            <p className="text-gray-400">No garages found.</p>
                        ) : (
                            <div className="space-y-4">
                                {filteredGarages.map((garage, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors duration-200"
                                        onClick={() => focusOnGarage(garage)}
                                    >
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-medium text-white">{garage.name}</h3>
                                            <span className={`px-2 py-1 rounded-full text-xs ${garage.type === 'premium' ? 'bg-yellow-500 text-black' :
                                                    garage.type === 'standard' ? 'bg-blue-500 text-white' :
                                                        'bg-green-500 text-white'
                                                }`}>
                                                {garage.type}
                                            </span>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>
                                            <span className="text-sm text-white">{garage.rating}</span>
                                        </div>
                                        {userLocation && (
                                            <p className="text-xs text-gray-400 mt-2">
                                                {garage.distance || calculateDistance(userLocation.lat, userLocation.lng, garage.lat, garage.lng)} km away
                                            </p>
                                        )}
                                        <button
                                            className="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 px-3 rounded transition-colors duration-200"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                focusOnGarage(garage);
                                            }}
                                        >
                                            View on Map
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Features section */}
            <section className="bg-gray-800 py-12 px-4 mt-5">
                <div className="container mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-8 text-white">Why Choose Our Garages?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-700 p-6 rounded-lg text-center">
                            <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-white">24/7 Service</h3>
                            <p className="text-gray-400">Our garages are open round the clock to serve you anytime.</p>
                        </div>
                        <div className="bg-gray-700 p-6 rounded-lg text-center">
                            <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-white">Quality Assurance</h3>
                            <p className="text-gray-400">All our garages are certified and maintain high quality standards.</p>
                        </div>
                        <div className="bg-gray-700 p-6 rounded-lg text-center">
                            <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-white">Fair Pricing</h3>
                            <p className="text-gray-400">Competitive and transparent pricing with no hidden costs.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer - COMMENTED OUT */}
            <footer className="bg-gray-900 py-8 text-center text-gray-400 text-sm">
                {/* <p>© {new Date().getFullYear()} Car Service Finder. All rights reserved.</p> */}
            </footer>
        </div>
    );
};

export default Geo;