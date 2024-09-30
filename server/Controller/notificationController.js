import User from "../Model/userModel.js";
import Notification from "../Model/notificationModel.js";




export const getNotification = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming req.user._id is the logged-in user ID

    // Find notifications where the user is either the finder or the loster
    const notifications = await Notification.find({
      $or: [
        {
          finderUserId: userId,
          readByFounder: false, // Finder has not read the notification
        },
        {
          lostUserId: userId,
          readByLoster: false, // Loster has not read the notification
        }
      ]
    }).sort({ createdAt: -1 }); // Sort by latest notifications first

    // If no notifications are found, return an empty array
    if (!notifications.length) {
      return res.status(200).json([]);
    }

    res.status(200).json({
        success: true,
        length: notifications.length,
        notifications,
      });
  } catch (error) {
    console.log("Error in getNotification controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};



export const markNotificationAsRead = async (req, res) => {
  try {
    const userId = req.user._id; // The logged-in user's ID
    const { notificationId } = req.params; // The ID of the notification to mark as read

    // Find the notification
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    // Check if the user is the finder or the loster in this notification
    if (notification.finderUserId.toString() === userId.toString()) {
      // User is the finder, mark readByFounder as true
      notification.readByFounder = true;
    } else if (notification.lostUserId.toString() === userId.toString()) {
      // User is the loster, mark readByLoster as true
      notification.readByLoster = true;
    } else {
      // User is neither the finder nor the loster, unauthorized to mark it as read
      return res.status(403).json({ error: "You are not authorized to mark this notification as read" });
    }

    // Save the updated notification
    await notification.save();

    res.status(200).json({ message: "Notification marked as read successfully", notification });
  } catch (error) {
    console.log("Error in markNotificationAsRead controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};







