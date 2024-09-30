import React from "react";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
// import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import Box from "@mui/material/Box";
import LogoutIcon from '@mui/icons-material/Logout';
import useLogout from "../../hooks/useLogout";
// import useGetNotifications from "../../hooks/useGetNotifications";
import NotificationIcon from "./NotificationIcon";
import { useNotificationContext } from "../../context/NotificationContext";

const NavbarIcons = () => {

 const {notifications}=  useNotificationContext()
  
    const {loading,logout}=useLogout();
    // const{notifications}=useGetNotifications()
    // console.log(notifications);
    
  
    const handleClick = () => {
        logout();
      }
  return (
    <Box display={"flex"}
    gap={2}
    
    >


      <Badge badgeContent={4} color="primary">
        <MailIcon color="action"   />
      </Badge>
      {/* <Badge badgeContent={notifications?.length} color="primary" 
      sx={{ 
          // fontSize: "40px", // Badge font size
          // '& .MuiBadge-badge': {
            //   fontSize: "20px", // Increases the badge number size
            //   minWidth: "50px", // Ensures the badge is large enough
        //   height: "24px",
        // }
      }}>
      <NotificationsActiveRoundedIcon color="action"  />
    </Badge> */}
    <NotificationIcon/>
   < LogoutIcon onClick={handleClick}/>
    </Box>
  );
};

export default NavbarIcons;
