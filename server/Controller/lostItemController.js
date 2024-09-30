import LostItem from "../Model/lostitemModel.js"; // Assuming the LostItem model is in this path
import asyncHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/CustomError.js";
import FoundItem from "../Model/foundItemModel.js";
import Notification from "../Model/notificationModel.js";
import {io,getReceiverSocketId} from "../socket/socket.js"

const calculateDistance = (location1, location2) => {
  const toRadians = (degree) => (degree * Math.PI) / 180;

  const R = 6371; // Radius of the Earth in kilometers
  // console.log(location1);
  // console.log(location2);
  
  const [lon1, lat1] = location1;
  const [lon2, lat2] = location2;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in kilometers
  console.log(distance);
  
  return distance;
};

// Updated function to match found items by category, description, and location
const matchFoundItem = async (category, description, location) => {
  // Find items matching the category
  const foundItems = await FoundItem.find({ category });

  if (!foundItems || foundItems.length === 0) {
    // Handle case where no items are found
    // throw new CustomError("No items found for the given category", 404);
    return false
  }

  // Filter the found items by description
  const matchedFoundItems = foundItems.filter((item) =>
    item.description.toLowerCase().includes(description.toLowerCase())
  );

  // Further filter matched items by location (within 5 km)
  const finalMatchedItems = matchedFoundItems.filter((item) => {
    if (item.location && item.location.coordinates) {
      // console.log(location, item.location);
      
      const distance = calculateDistance(location.coordinates, item.location.coordinates);


      return distance <= 5; // Distance in kilometers
    }
    return false;
  });

  // console.log(finalMatchedItems);

  return finalMatchedItems;
};

export const createLostItem = asyncHandler(async (req, res, next) => {
  const { category, description, dateLost,location } = req.body;

  if (!category || !description || !dateLost || !location) {
    return next(new CustomError("Please provide all required fields", 400));
  }

  const lostItem = await LostItem.create({
    user: req.user._id,
    category,
    description,
    dateLost,
    location
  });

  const matchedItems = await matchFoundItem(category, description,location);

  if (matchedItems.length > 0) {
    let founderIds = [];
    for (const foundItem of matchedItems) {
      const notification = await Notification.create({
        lostUserId: req.user._id,
        finderUserId: foundItem.founderUserId,
        message: `A potential match for your lost item has been found.`,
        lostItemId: lostItem._id,
        foundItemId: foundItem._id,
        readByFounder: false,
        readByLoster: false,
      });

      founderIds.push(foundItem.founderUserId);

      await FoundItem.findByIdAndUpdate(foundItem._id, {
        status: "Matched",
        losterId: req.user._id,
      });

      // Populate necessary fields for the response
      const populatedNotification = await Notification.findById(notification._id)
        // .populate("lostUserId", "name")
        // .populate("finderUserId", "name")
        // .populate("lostItemId", "category description dateLost status")
        // .populate("foundItemId", "category description dateFound status");

      // Format the notification object as required
      // const notificationObject = {
      //   _id: populatedNotification._id,
      //   lostUserId: {
      //     _id: populatedNotification.lostUserId._id,
      //     name: populatedNotification.lostUserId.name,
      //   },
      //   finderUserId: {
      //     _id: populatedNotification.finderUserId._id,
      //     name: populatedNotification.finderUserId.name,
      //   },
      //   message: populatedNotification.message,
      //   lostItemId: {
      //     _id: populatedNotification.lostItemId._id,
      //     category: populatedNotification.lostItemId.category,
      //     description: populatedNotification.lostItemId.description,
      //     dateLost: populatedNotification.lostItemId.dateLost,
      //     status: populatedNotification.lostItemId.status,
      //     founderId: populatedNotification.lostItemId.founderId,
      //   },
      //   foundItemId: {
      //     _id: populatedNotification.foundItemId._id,
      //     category: populatedNotification.foundItemId.category,
      //     description: populatedNotification.foundItemId.description,
      //     dateFound: populatedNotification.foundItemId.dateFound,
      //     status: populatedNotification.foundItemId.status,
      //   },
      //   readByFounder: populatedNotification.readByFounder,
      //   readByLoster: populatedNotification.readByLoster,
      //   createdAt: populatedNotification.createdAt,
      // };

      // Emit the notification to the lost user
      const losterSocketId = getReceiverSocketId(req.user._id.toString());
      if (losterSocketId) {
        console.log("losterSocketId: " + losterSocketId);
        
        io.to(losterSocketId).emit("new_notification", populatedNotification);
      }

      // Emit the notification to the finder user
      const finderSocketId = getReceiverSocketId(foundItem.founderUserId.toString());
      if (finderSocketId) {
        io.to(finderSocketId).emit("new_notification", populatedNotification);
      }
    }

    const updatedItem = await LostItem.findByIdAndUpdate(
      lostItem._id,
      { status: "Matched", founderId: founderIds },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Lost item created, and potential matches found.",
      data: updatedItem,
    });
  }

  res.status(201).json({
    success: true,
    message: "Lost item created. No matches found at the moment.",
    data: lostItem,
  });
});


export const getLostItemsbyUserId = asyncHandler(async (req, res, next) => {
  // const filters = req.query || {};
  const lostItems = await LostItem.find({user: req.user.id});

  res.status(200).json({
    success: true,
    length:lostItems?.length,
    data: lostItems,
  });
});

export const getLostItems = asyncHandler(async (req, res, next) => {
  const filters = req.query || {};
  const lostItems = await LostItem.find(filters);

  res.status(200).json({
    success: true,
    length:lostItems?.length,
    data: lostItems,
  });
});


export const getLostItemById = asyncHandler(async (req, res, next) => {
  const lostItem = await LostItem.findById(req.params.id);

  if (!lostItem) {
    return next(new CustomError("Lost item not found", 404));
  }

  res.status(200).json({
    success: true,
    data: lostItem,
  });
});

export const updateLostItem = asyncHandler(async (req, res, next) => {
  const lostItem = await LostItem.findById(req.params.id);

  if (!lostItem) {
    return next(new CustomError("Lost item not found", 404));
  }

  const updatedData = req.body;

  Object.keys(updatedData).forEach((key) => {
    lostItem[key] = updatedData[key];
  });

  await lostItem.save();

  res.status(200).json({
    success: true,
    data: lostItem,
  });
});

export const deleteLostItem = asyncHandler(async (req, res, next) => {
  const lostItem = await LostItem.findById(req.params.id);

  if (!lostItem) {
    return next(new CustomError("Lost item not found", 404));
  }

  await lostItem.deleteOne(); // Delete the lost item

  res.status(200).json({
    success: true,
    data: lostItem,
  });
});


