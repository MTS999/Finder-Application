import React from "react";
import useGetMesseges from "../../hooks/useGetMesseges";
import {Box} from "@mui/material";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";
import { useConversationContext } from '../../context/ConversationContext'

const Messages = () => {
  const { messeges, loading } = useGetMesseges();
  const {chatPersonName}=   useConversationContext()

  useListenMessages();
//   console.log(messeges);

  return (
    <>
    
      {messeges?.map((message) => (
        <Box key={message._id} display={"flex"}

        flexDirection={"column"}
        >
          <Message message={message} />
        </Box>
      ))}
    </>
  );
};

export default Messages;
