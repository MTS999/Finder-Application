import { createContext, useContext, useState } from "react";

export const NotificationContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useNotificationContext = () => {
  return useContext(NotificationContext);
};

export const NotificationContextProvider = ({ children }) => {
  const [notifications, setNotifications] = useState({});
//  console.log(authUser);
 
  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
