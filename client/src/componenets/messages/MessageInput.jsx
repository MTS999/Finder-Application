import React, { useState } from "react";
import {TextField,Box} from "@mui/material";
import useSendMessege from "../../hooks/useSendMessege";
import Button from "@mui/material/Button";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessege();

  function handleSubmit() {
    sendMessage(message);
    setMessage("");
    // console.log(message);
  }

  return (
    <Box width={"100%"}
    sx={{
      backgroundColor: "yellow"
    }}>
      <TextField
        id="messageInput"
        label="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        send
      </Button>
    </Box>
  );
};

export default MessageInput;
