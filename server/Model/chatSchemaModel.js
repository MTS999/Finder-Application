import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ChatSchema = new Schema({
  participants: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      role: {
        type: String,
        enum: ['finder', 'loster'], // Defining roles as either finder or loster
        required: true
      }
    }
  ],
  messages: [
    {
      sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      text: {
        type: String,
        required: true
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ],
  lostItemId: {
    type: Schema.Types.ObjectId,
    ref: 'LostItem',
    required: true
  },
  foundItemId: {
    type: Schema.Types.ObjectId,
    ref: 'FoundItem',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Automatically update `updatedAt` whenever a new message is added
ChatSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Chat = model('Chat', ChatSchema);

export default Chat;
