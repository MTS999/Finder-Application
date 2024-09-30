import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const useGetLostItems = () => {
  const [loading, setLoading] = useState(false);
  const [lostItems, setlostItems] = useState([]);

  const { authUser } = useAuthContext();

  useEffect(() => {
    const getLostItems = async () => {
      // console.log(authUser?.token);

      setLoading(true);
    //   console.log(authUser);

      try {
        // make api call

        const { data } = await axios.get(
          "http://localhost:3000/api/lost-items",
          {
            headers: {
              Authorization: `Bearer ${authUser?.token}`,
            },
          }
        );

        // console.log(data);
        setlostItems(data.data)

        // toast.success("lostItems Successful");
      } catch (error) {
        toast.error("lostItems Failed");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    getLostItems()
   
  }, [authUser]);

  return { loading, lostItems };
};

export default useGetLostItems;
