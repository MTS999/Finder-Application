import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { useConversationContext } from "../../context/ConversationContext";

const MessageNavbar = () => {
  const { chatPersonName } = useConversationContext();

  return (
    <Box display={"flex"} width={"100%"} sx={{ backgroundColor: "green" }}>

        <Avatar>{chatPersonName?.name?.[0]?.toUpperCase()}</Avatar>
      <Typography variant="body1" color="initial">
        {chatPersonName?.name}
      </Typography>
    </Box>
  );
};

export default MessageNavbar;
