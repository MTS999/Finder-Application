import React from "react";
import useGetFindItems from "../../hooks/useGetFindItems";
import { Button, Typography,Box } from "@mui/material";
import FoundItems from "../../componenets/fondItems/FoundItems";
import LostItems from "../../componenets/lostItems/LostItems";
import ConversationSidebar from "../../componenets/messages/ConversationSidebar";
import ResponsiveDrawer from "../../componenets/ResponsiveDrawer";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <Box display={"flex"} justifyContent={"center"}
    
    sx={{
      height: "100%",
        overflow: "scroll",
    }}>

      <ResponsiveDrawer/>
      
      <Outlet/>
    
      <ConversationSidebar/>
    </Box>
  );
};

export default Home;
