import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const NotificationSchema = new Schema({
  lostUserId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  finderUserId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  lostItemId: {
    type: Schema.Types.ObjectId,
    ref: 'LostItem', // Reference to the lost item
    required: true
  },
  foundItemId: {
    type: Schema.Types.ObjectId,
    ref: 'FoundItem', // Reference to the found item
    required: true
  },
  readByFounder: {
    type: Boolean,
    default: false // Notification is unread by default
  },
  readByLoster: {
    type: Boolean,
    default: false // Notification is unread by default
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export the model
const Notification = model('Notification', NotificationSchema);

export default Notification;
