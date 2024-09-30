import React, { useState } from 'react';
import {
  Button,
  TextField,
  MenuItem,
  Grid,
  Typography,
  CircularProgress
} from '@mui/material';
import useAddFoundItem from '../../hooks/useAddFoundItem';
import useGeocode from "../../hooks/useGeocode"; // Import the geocode hook


// Categories options
const categories = ['Electronics', 'Clothing', 'Accessories', 'Pets', 'Documents', 'Others'];

const AddFindItem = () => {
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [dateFound, setDateFound] = useState('');
    
  const { addFoundItem, loading } = useAddFoundItem(); // Use the custom hook

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addFoundItem(category, description, address, dateFound);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Report a Found Item
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Category"
            select
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Date Found"
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
            value={dateFound}
            onChange={(e) => setDateFound(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddFindItem;
