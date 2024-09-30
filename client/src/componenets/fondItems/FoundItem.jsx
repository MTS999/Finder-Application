import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useConversationContext } from "../../context/ConversationContext";
import { useNavigate } from "react-router-dom";


const FoundItem = ({ findItem }) => {
  const navigate = useNavigate();
  const { conversation, setConversation, openChatSideBar, setOpenChatSideBar } =
    useConversationContext();

  function handleClick(id) {
    setConversation(id);
    setOpenChatSideBar(true)

  }

  function goToDetailPage(){
    navigate(`/findItemDetail/${findItem._id}`, {state:{findItem}})
  }


  
  return (
    <Box display={"flex"}
    flexDirection={"column"}
    justifyContent={"space-between"}
    alignItems={"center"}
    border={"2px solid RED"}
    borderRadius={"10px"}
    padding={"20px"}
    margin={"10px"}
    width={"300px"}

    >
      <Typography variant="h4" color="initial">
        {findItem?.category}
      </Typography>
      <Typography variant="h6" color="initial">
        {findItem?.description}
      </Typography>
      <Typography variant="body1" color="initial">
        {findItem?.createdAt}
      </Typography>
      <Typography variant="body1" color="initial">
        {findItem?.dateFound}
      </Typography>
      <Typography variant="body1" color="initial">
        {findItem?.status}
      </Typography>

      {findItem.losterId?.map((id) => (
        <Box key={id}  onClick={()=>handleClick(id)} >
          <Typography key={id} variant="body1" color="initial">
            {/* loster: {id} */}
            Chat with Expected Owner
          </Typography>
        </Box>
      ))},


      <Button variant="text" color="primary" onClick={goToDetailPage}>
        Detail
      </Button>

    </Box>
  );
};

export default FoundItem;
