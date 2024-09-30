import React from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Chip,
} from "@mui/material";
import { useConversationContext } from "../../context/ConversationContext";

const LostItemDetail = () => {
  const location = useLocation();
  const { lostItem } = location.state;

  const { conversation, setConversation, openChatSideBar, setOpenChatSideBar } =
  useConversationContext();
  function handleClick(id) {
    setConversation(id);
    setOpenChatSideBar(true);
  }

  return (
    <Box sx={{ p: 4 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Lost Item Details
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Category:
              </Typography>
              <Typography variant="body1">{lostItem.category}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Description:
              </Typography>
              <Typography variant="body1">{lostItem.description}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Status:
              </Typography>
              <Chip label={lostItem.status} color="secondary" />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Date Lost:
              </Typography>
              <Typography variant="body1">
                {new Date(lostItem.dateLost).toDateString()}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Last Seen Location:
              </Typography>
              <Typography variant="body1">
                Latitude: {lostItem.location.coordinates[1]}
              </Typography>
              <Typography variant="body1">
                Longitude: {lostItem.location.coordinates[0]}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Loster User ID:
              </Typography>
              <Typography variant="body1">{lostItem.losterUserId}</Typography>
            </Grid>
          </Grid>
        </CardContent>

        {lostItem.founderId?.map((id) => (
        <Box key={id} onClick={() => handleClick(id)}>
          <Typography key={id} variant="body1" color="initial">
            {/* Founder: {id} */}
            Chatwith Founder
          </Typography>
        </Box>
      ))}
      </Card>
    </Box>
  );
};

export default LostItemDetail;
