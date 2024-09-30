import mongoose from 'mongoose';

const FoundItemSchema = new mongoose.Schema({
  founderUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Clothing', 'Accessories', 'Pets', 'Documents', 'Others'],
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: {
      type: [Number],
      // required: true
    }
  },
  losterId:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user who found the item
    default: null, // If the item is not found, this will remain null
  }],
  dateFound: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Found', 'Matched', 'Returned'],
    default: 'Found',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// FoundItemSchema.index({ location: '2dsphere' });

const FoundItem = mongoose.model('FoundItem', FoundItemSchema);
export default FoundItem;
