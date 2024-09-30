// src/hooks/useGeocode.js
import { useState } from "react";

const apiKey = import.meta.env.VITE_API_KEY; // Replace with your actual API key

const useGeocode = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const forwardGeocode = async (address) => {
    setLoading(true);
    setError(null);
    
    const url = `https://geocode.xyz/${encodeURIComponent(address)}?json=1&auth=${apiKey}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      
      // Extract coordinates and other useful data
      if (data.latt && data.longt) {
        const result = {
          latitude: data.latt,
          longitude: data.longt,
          // city: data.city || "Unknown",
          // state: data.state || "Unknown",
          // country: data.country || "Unknown",
          // address: data.staddress || "No address",
          // region: data.region || "Unknown",
        };
        return result; // Returning all necessary details
      } else {
        throw new Error('Geocoding failed or no coordinates found.');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error fetching geocoding data:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { forwardGeocode, loading, error };
};

export default useGeocode;
