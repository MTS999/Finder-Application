import Conversation from "../Model/conversationModel.js";
import Message from "../Model/messageModel.js";
import User from "../Model/userModel.js";
import { getReceiverSocketId,io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
      const { message } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id;
      let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
      });
      if (!conversation) {
        conversation = await Conversation.create({
          participants: [senderId, receiverId],
        });
      }
  
      const newMessage = new Message({
        senderId,
        receiverId,
        message,
      });
  
      if (newMessage) {
        conversation.messages.push(newMessage._id);
      }
  
      await Promise.all([conversation.save(), newMessage.save()]);

      // Get receiver socket id using getReceiverSocketId function
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        console.log("please recive request");


        
        // io.to(<socket_id>).emit() used to send events to specific client
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
      res.status(201).json(newMessage);
    } catch (error) {
      console.log("Error in getMessages controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };


  export const getMessage = async (req, res) => {
    try {
      const { id: userToChatId } = req.params;
      const senderId = req.user._id;
  
      const conversation = await Conversation.findOne({
        participants: { $all: [senderId, userToChatId] },
      }).populate("messages");
      if (!conversation) return res.status(200).json([]);
  
      const messages = conversation.messages;
      const userToChatName=await User.findOne({_id: userToChatId})
  
      res.status(200).json({messages, userToChatName});
    } catch (error) {
      console.log("Error in getMessages controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };