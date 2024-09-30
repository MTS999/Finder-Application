// src/components/AddLostItemForm.js
import React, { useState } from "react";
import { Box, Button, TextField, MenuItem, Grid, Typography } from "@mui/material";
import useAddLostItem from "../../hooks/useAddLostItem";
import useGeocode from "../../hooks/useGeocode"; // Import the geocode hook

const categories = [
  "Electronics",
  "Clothing",
  "Accessories",
  "Pets",
  "Documents",
  "Others",
];

const AddLostItemForm = () => {
  const [formData, setFormData] = useState({
    category: "Others",
    description: "",
    address: "",
    dateLost: "",
  });

  const { addLostItem, loading: addLoading } = useAddLostItem();
  const { forwardGeocode, loading: geocodeLoading, error: geocodeError } = useGeocode();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetch coordinates and additional data from the provided address
    const geocodeData = await forwardGeocode(formData.address);
    // console.log(geocodeData);
    
    if (geocodeData) {
      const lostItemData = {
        ...formData,
        location: {
          type: "Point",
          coordinates: [parseFloat(geocodeData.longitude), parseFloat(geocodeData.latitude)], // In GeoJSON format [longitude, latitude]
        },
        // city: geocodeData.city,
        // state: geocodeData.state,
        // country: geocodeData.country,
        // address: geocodeData.address, // Extracted address from API response
        // region: geocodeData.region,
      };

      console.log(lostItemData);
      
      await addLostItem(lostItemData);
    } else {
      console.error("Failed to retrieve geocode data");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add a Lost Item
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            fullWidth
            required
          >
            {categories.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            required
            multiline
            rows={4}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            fullWidth
            required
            helperText={geocodeError || "Enter the address where the item was lost."}
            error={!!geocodeError}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Date Lost"
            name="dateLost"
            type="date"
            value={formData.dateLost}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={addLoading || geocodeLoading}
            fullWidth
          >
            {geocodeLoading ? "Geocoding..." : addLoading ? "Adding..." : "Add Lost Item"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddLostItemForm;
