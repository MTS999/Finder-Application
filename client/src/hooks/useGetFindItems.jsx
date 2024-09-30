import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const useGetFindItems = () => {
  const [loading, setLoading] = useState(false);
  const [findItems, setFindItems] = useState([]);

  const { authUser } = useAuthContext();
 
  useEffect(() => {
    const getFindItems = async () => {
      setLoading(true);
      // console.log(authUser);
  
      try {
        // make api call

        const { data } = await axios.get(
          "http://localhost:3000/api/found-items",
          {
            headers: {
              Authorization: `Bearer ${authUser?.token}`,
            },
          }
        );

        // console.log(data);
        setFindItems(data.data)

        // toast.success("findItems Successful");
      } catch (error) {
        toast.error("findItems Failed");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    getFindItems()
   
  }, [authUser]);

  return { loading, findItems };
};

export default useGetFindItems;
