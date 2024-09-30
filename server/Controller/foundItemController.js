import FoundItem from "../Model/foundItemModel.js";
import LostItem from "../Model/lostitemModel.js";
import Notification from "../Model/notificationModel.js";
import express from "express";
import CustomError from "../utils/CustomError.js";
import asyncHandler from "../utils/asyncErrorHandler.js";
import { protect } from "./authController.js";
import {io,getReceiverSocketId} from "../socket/socket.js"


const calculateDistance = (location1, location2) => {
  const toRadians = (degree) => (degree * Math.PI) / 180;

  const R = 6371; // Radius of the Earth in kilometers
  
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
  
  return distance;
};

// Match lost items with the newly created found item
const matchLostItems = async (category, description, location) => {
  const lostItems = await LostItem.find({ category, status: "Lost" }); // You might need to update the status check

  if (!lostItems || lostItems.length === 0) {
    return [];
  }

  const matchedLostItems = lostItems.filter((item) =>
    item.description.toLowerCase().includes(description.toLowerCase())
  );

  const finalMatchedLostItems = matchedLostItems.filter((item) => {
    if (item.location && item.location.coordinates) {
      const distance = calculateDistance(location.coordinates, item.location.coordinates);
      return distance <= 5;
    }
    return false;
  });

  return finalMatchedLostItems;
};

export const createFoundItem = asyncHandler(async (req, res, next) => {
  const { category, description, dateFound, location } = req.body;

  if (!category || !description || !dateFound || !location) {
    return next(new CustomError("Please provide all required fields", 400));
  }

  const foundItem = await FoundItem.create({
    founderUserId: req.user._id,
    category,
    description,
    dateFound,
    location,
  });

  // Match with lost items
  const matchedItems = await matchLostItems(category, description, location);

  if (matchedItems.length > 0) {
    let losterIds = [];
    for (const lostItem of matchedItems) {
      const notification = await Notification.create({
        lostUserId: lostItem.user,
        finderUserId: req.user._id,
        message: `A potential match for your found item has been identified.`,
        lostItemId: lostItem._id,
        foundItemId: foundItem._id,
        readByFounder: false,
        readByLoster: false,
      });

      losterIds.push(lostItem.user);

      await LostItem.findByIdAndUpdate(lostItem._id, {
        status: "Matched",
        founderId: req.user._id,
      });

      const populatedNotification = await Notification.findById(notification._id);

      // Emit the notification to the finder
      const finderSocketId = getReceiverSocketId(req.user._id.toString());
      if (finderSocketId) {
        io.to(finderSocketId).emit("new_notification", populatedNotification);
      }

      // Emit the notification to the loster
      const losterSocketId = getReceiverSocketId(lostItem.user.toString());
      if (losterSocketId) {
        io.to(losterSocketId).emit("new_notification", populatedNotification);
      }
    }

    const updatedItem = await FoundItem.findByIdAndUpdate(
      foundItem._id,
      { status: "Matched", losterId: losterIds },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Found item created, and potential matches found.",
      data: updatedItem,
    });
  }

  res.status(201).json({
    success: true,
    message: "Found item created. No matches found at the moment.",
    data: foundItem,
  });
});

export const getFoundItems = asyncHandler(async (req, res, next) => {
   
  
    const foundItems = await FoundItem.find();
    console.log("hwllo");
    
    res.status(200).json({
      success: true,
      count: foundItems.length,
      data: foundItems,
    });
  });



  export const getFoundItemByUserId = asyncHandler(async (req, res, next) => {
  
  
    const foundItems = await FoundItem.find({founderUserId:req.user._id});
    // console.log("mts");
    
    res.status(200).json({
      success: true,
      count: foundItems.length,
      data: foundItems,
    });
  });
  export const getFoundItemById = asyncHandler(async (req, res, next) => {
    console.log(req.params.id);
    
    const foundItem = await FoundItem.findById(req.params.id);
  
    if (!foundItem) {
      return next(new CustomError("Found item not found", 404));
    }
  
    res.status(200).json({
      success: true,
      data: foundItem,
    });
  });
  export const updateFoundItem = asyncHandler(async (req, res, next) => {
    const { category, description, dateFound } = req.body;
  
    let foundItem = await FoundItem.findById(req.params.id);
  
    if (!foundItem) {
      return next(new CustomError("Found item not found", 404));
    }
  
    foundItem = await FoundItem.findByIdAndUpdate(
      req.params.id,
      { category, description, dateFound },
      { new: true, runValidators: true }
    );
  
    res.status(200).json({
      success: true,
      data: foundItem,
    });
  });

  export const deleteFoundItem = asyncHandler(async (req, res, next) => {
    const foundItem = await FoundItem.findById(req.params.id);
  
    if (!foundItem) {
      return next(new CustomError("Found item not found", 404));
    }
  
    await foundItem.deleteOne(req.params._id);
  
    res.status(200).json({
      success: true,
      data: foundItem,
    });
  });
  
