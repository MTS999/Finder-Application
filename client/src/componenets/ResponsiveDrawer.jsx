import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import FoundItems from "./fondItems/FoundItems";
// import LostItems from "./lostItems/LostItems";
import { useState } from "react";
// import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import NavbarIcons from "./Navbar/NavbarIcons";
import { useAuthContext } from "../context/AuthContext";
// import AddLostItem from "./lostItems/AddLostItem";
// import AddFindItem from "./fondItems/AddFindItem";
import { Outlet } from "react-router-dom";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ConversationSidebar from "./messages/ConversationSidebar";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  // const [select, setSelect] = useState("findItems");
  const { authUser } = useAuthContext();
  const navigate = useNavigate(); // Initialize useNavigate

  // console.log(select);

  // const handleSelectChange = (value) => {
  //   setSelect(value);
  // };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem
          key={"findItems"}
          disablePadding
          onClick={() => navigate("/findItems")}
        >
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"findItems"} />
          </ListItemButton>
        </ListItem>
        <ListItem
          key={"lostItems"}
          disablePadding
          onClick={() => navigate("/lostItems")}
        >
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"lostItems"} />
          </ListItemButton>
        </ListItem>
        <ListItem
          key={"addLostItem"}
          disablePadding
          // onClick={() => handleSelectChange("addLostItem")}
          onClick={() => navigate("/addlostItem")}
        >
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"lostItems"} />
          </ListItemButton>
        </ListItem>
        <ListItem
          key={"addFindItem"}
          disablePadding
          // onClick={() => handleSelectChange("addFindItem")}
          onClick={() => navigate("/addfindItem")}
        >
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"addFindItem"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
            <Box>
              <Typography variant="h6" noWrap component="div">
                Finder App {authUser.data.name}
              </Typography>
            </Box>
            <Box>
              <NavbarIcons />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        > </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <ConversationSidebar />

        <Outlet />
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
