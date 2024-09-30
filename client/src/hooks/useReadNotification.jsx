import { useConversationContext } from "../context/ConversationContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import {  useNotificationContext } from "../context/NotificationContext";

const useReadNotification = () => {
  const [loading, setLoading] = useState(false);
  const {notifications, setNotifications}=useNotificationContext()

  const { authUser } = useAuthContext();

  // const [notifications, setNotifications] = useState({})

    

    const readNotification = async (notificationId) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/notification/mark/${notificationId}`,
          {
            headers: {
              Authorization: `Bearer ${authUser.token}`,
            },
          }
        );

        console.log(response.data);
        // setNotifications(response.data);
        // const updatedNotifications = notifications?.notifications?.filter(
        //     (notification) => notification._id !== notificationId
        //   );
        //   setNotifications(updatedNotifications);
        const updatedNotifications = notifications?.notifications?.filter(
            (notification) => notification._id !== notificationId
        );
        
        // Update the state with the new notifications array
        setNotifications((prev) => ({
            ...prev,
            notifications: updatedNotifications,
            length: updatedNotifications.length, // Update the length if needed
        }));
        
      } catch (error) {
        toast.error("lostItems Failed");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    

  return { loading,readNotification };
};

export default useReadNotification;
