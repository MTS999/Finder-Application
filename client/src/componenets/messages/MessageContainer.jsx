import React from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import MessageNavbar from './MessageNavbar';
import Box from '@mui/material/Box';

const MessageContainer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh', // Full viewport height
      }}
    >
      {/* Sticky Navbar at the top */}
      <Box sx={{ position: 'sticky', top: 0, zIndex: 1000 }}>
        <MessageNavbar />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto', // Enable scrolling
          padding: 2,
        }}
      >
        <Messages />
      </Box>

      {/* Sticky input at the bottom */}
      <Box sx={{ position: 'sticky', bottom: 0, zIndex: 1000 }}>
        <MessageInput />
      </Box>
    </Box>
  );
};

export default MessageContainer;
