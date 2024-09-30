import { useSocketContext } from "../context/SocketContext";
import { useNotificationContext } from "../context/NotificationContext";
import { useEffect } from "react";

const useListenGetNotifications = () => {
  const { socket } = useSocketContext();
  const { notifications, setNotifications } = useNotificationContext();

  useEffect(() => {
    // console.log("i am acomming");
    
    // Listen for "new_notification" event
    socket?.on("new_notification", (notification) => {
      console.log("New notification:", notification);
      setNotifications(prevState => ({
        ...prevState,
        notifications: [...prevState.notifications, notification],
        length: prevState.notifications.length + 1 // Increment length
      }));
  
    });

    // Cleanup: Turn off the event listener
    return () => {
      socket?.off("new_notification"); // Corrected event name
    };
  }, [socket, setNotifications,notifications]);

  return <div>useListenGetNotifications</div>;
};

export default useListenGetNotifications;
