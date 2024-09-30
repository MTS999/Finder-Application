import React from "react";
import { Box,Button, Typography } from "@mui/material";
import { useConversationContext } from "../../context/ConversationContext";
import { useNavigate } from "react-router-dom";
const LostItem = ({ lostItem }) => {
  const { conversation, setConversation, openChatSideBar, setOpenChatSideBar } =
    useConversationContext();
  const navigate = useNavigate();
  function handleClick(id) {
    setConversation(id);
    setOpenChatSideBar(true);
  }
  function goToDetailPage(){
    navigate(`/lostItemDetail/${lostItem._id}`, {state:{lostItem}})
  }
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      alignItems={"center"}
      border={"2px solid RED"}
      borderRadius={"10px"}
      padding={"20px"}
      margin={"10px"}
      overflow={"hidden"}
    >
      <Typography variant="h4" color="initial">
        {lostItem?.category}
      </Typography>
      <Typography variant="h6" color="initial">
        {lostItem?.description}
      </Typography>
      <Typography variant="body1" color="initial">
        {lostItem?.createdAt}
      </Typography>
      <Typography variant="body1" color="initial">
        {lostItem?.dateFound}
      </Typography>
      <Typography variant="body1" color="initial">
        {lostItem?.status}
      </Typography>

      {lostItem.founderId?.map((id) => (
        <Box key={id} onClick={() => handleClick(id)}>
          <Typography key={id} variant="body1" color="initial">
            {/* Founder: {id} */}
            Chatwith Founder
          </Typography>
        </Box>
      ))}

      <Button variant="text" color="primary" onClick={goToDetailPage}>
        Detail
      </Button>
    </Box>
  );
};

export default LostItem;
