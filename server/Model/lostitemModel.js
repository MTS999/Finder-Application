import mongoose from 'mongoose';

const LostItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Clothing', 'Accessories', 'Pets', 'Documents', 'Others'],
    default:"others",
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  dateLost: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Lost', 'Matched', 'Recovered'],
    default: 'Lost',
  },
  founderId:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user who found the item
    default: null, // If the item is not found, this will remain null
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});


const LostItem = mongoose.model('LostItem', LostItemSchema);
export default LostItem;
