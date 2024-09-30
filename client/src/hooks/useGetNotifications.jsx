import { useConversationContext } from "../context/ConversationContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import {  useNotificationContext } from "../context/NotificationContext";

const useGetNotifications = () => {
  const [loading, setLoading] = useState(false);
  const {notifications, setNotifications}=useNotificationContext()

  const { authUser } = useAuthContext();

  // const [notifications, setNotifications] = useState({})

  useEffect(() => {
    

    const getNotification = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/notification`,
          {
            headers: {
              Authorization: `Bearer ${authUser.token}`,
            },
          }
        );

        // console.log(response.data);
        setNotifications(response.data);
        
      } catch (error) {
        toast.error("lostItems Failed");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
      getNotification();
    
  }, [authUser ]);

  return { loading };
};

export default useGetNotifications;
