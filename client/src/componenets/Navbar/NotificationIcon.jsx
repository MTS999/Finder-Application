import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useGetNotifications from "../../hooks/useGetNotifications";
import Badge from "@mui/material/Badge";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import NotificationList from "./NotificationList";
import { useNotificationContext } from "../../context/NotificationContext";

export default function NotificationIcon() {
  useGetNotifications();

  const { notifications } = useNotificationContext();
  // console.log(notifications);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Badge
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        badgeContent={notifications?.length}
        color="primary"
        sx={
          {
            // fontSize: "40px", // Badge font size
            // '& .MuiBadge-badge': {
            //   fontSize: "20px", // Increases the badge number size
            //   minWidth: "50px", // Ensures the badge is large enough
            //   height: "24px",
            // }
          }
        }
      >
        <NotificationsActiveRoundedIcon color="action" />
      </Badge>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
        <NotificationList />
      </Menu>
    </div>
  );
}
