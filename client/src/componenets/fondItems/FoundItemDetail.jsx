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

const FoundItemDetail = () => {
  const location = useLocation();
  const { findItem } = location.state;

  return (
    <Box sx={{ p: 4 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Found Item Details
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Category:
              </Typography>
              <Typography variant="body1">{findItem.category}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Description:
              </Typography>
              <Typography variant="body1">{findItem.description}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Status:
              </Typography>
              <Chip label={findItem.status} color="primary" />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Date Found:
              </Typography>
              <Typography variant="body1">
                {new Date(findItem.dateFound).toDateString()}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Location Coordinates:
              </Typography>
              <Typography variant="body1">
                Latitude: {findItem.location.coordinates[1]}
              </Typography>
              <Typography variant="body1">
                Longitude: {findItem.location.coordinates[0]}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Founder User ID:
              </Typography>
              <Typography variant="body1">{findItem.founderUserId}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Loster ID:
              </Typography>
              <Typography variant="body1">{findItem.losterId.join(", ")}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FoundItemDetail;
