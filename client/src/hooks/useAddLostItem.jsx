import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useAddLostItem = () => {
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthContext();

  const addLostItem = async (lostItemData) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/lost-items",
        lostItemData,
        {
          headers: {
            Authorization: `Bearer ${authUser?.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Lost item added successfully!");
      return data;
    } catch (error) {
      toast.error("Failed to add lost item");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { addLostItem, loading };
};

export default useAddLostItem;
