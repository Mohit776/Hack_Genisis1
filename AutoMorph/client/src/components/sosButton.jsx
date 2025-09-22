import React, { useEffect } from 'react';

const SosButton = () => {
  useEffect(() => {
    // Load EmailJS script and initialize
    const script1 = document.createElement('script');
    script1.src = "https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js";
    script1.async = true;
    
    const script2 = document.createElement('script');
    script2.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script2.async = true;
    
    document.head.appendChild(script1);
    document.head.appendChild(script2);
    
    script2.onload = () => {
      // Initialize EmailJS only once
      if (!window.emailjsInitialized) {
        window.emailjsInitialized = true;
        window.emailjs.init({
          publicKey: "OUTafODJQIYvh7os6",
        });
      }
    };
    
    return () => {
      // Clean up if needed
    };
  }, []);

  async function sendSOS() {
    // Get current location
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(async position => {
      const lat = position.coords.latitude.toFixed(6);
      const lon = position.coords.longitude.toFixed(6);

      // Reverse geocode (optional): get address
      let location =` Lat: ${lat}, Lon: ${lon}`;
      alert("Sending SOS ... ")
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
        const data = await res.json();
        if (data.display_name) {
          location = data.display_name;
        }
      } catch (e) {
        console.warn("Reverse geocoding failed, using coordinates only.");
      }

      // Send the email
      const templateParams = {
        location: location,
        lat: lat,
        lon: lon,
        name: "Raghav Bhardwaj" // static name or make it dynamic
      };

      window.emailjs.send("service_2hli2dc", "template_2un1mjb", templateParams)
        .then(() => {
          alert("SOS email sent successfully!");
        })
        .catch(error => {
          console.error("EmailJS Error:", error);
          alert("Failed to send email. Check console for details.");
        });

    }, error => {
      alert("Failed to get location: " + error.message);
    });
  }

  return (
    <div>
      <button onClick={sendSOS} style={{
        padding: '15px 40px',
        fontSize: '18px',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#ff4444',
        border: 'none',
        borderRadius: '24px',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        transition: 'all 0.3s ease'
      }}>Send SOS </button>
    </div>
  );
}

export default SosButton;