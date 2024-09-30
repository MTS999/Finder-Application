import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import useGeocode from './useGeocode';

const useAddFoundItem = () => {
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthContext(); // Authentication context
  const { forwardGeocode } = useGeocode();


  // Function to geocode address

 

  // Function to add a found item
  const addFoundItem = async (category, description, address, dateFound) => {
    setLoading(true);
    try {
      const geocodeData = await forwardGeocode(address);
      if (!geocodeData) return;

      const foundItemData = {
        category,
        description,
        location: {
          type: 'Point',
          coordinates: [parseFloat(geocodeData.longitude), parseFloat(geocodeData.latitude)], // In GeoJSON format [longitude, latitude]
        },
        dateFound,
      };

      const { data } = await axios.post(
        'http://localhost:3000/api/found-items',
        foundItemData,
        {
          headers: {
            Authorization: `Bearer ${authUser?.token}`,
          },
        }
      );

      toast.success('Item added successfully!');
      return data; // Return the response data if needed
    } catch (error) {
      console.error('Error adding found item:', error);
      toast.error('Failed to add found item.');
    } finally {
      setLoading(false);
    }
  };

  return { addFoundItem, loading };
};

export default useAddFoundItem;
