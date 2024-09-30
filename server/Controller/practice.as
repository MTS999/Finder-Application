import FoundItem from "../Model/foundItemModel.js";
import express from "express";
import CustomError from "../utils/CustomError.js";
import asyncHandler from "../utils/asyncErrorHandler.js";
import { protect } from "./authController.js";

export const createFoundItem = asyncHandler(async (req, res, next) => {
  const { category, description,dateFound ,location} = req.body;

  console.log("mts");
  if (!category || !description||!dateFound) {
    const err= new CustomError(
      "Please provide all required fields: category and description and date",
      400
    );

    return next(err)
  }

  const foundItem = await FoundItem.create({
    founderUserId: req.user._id,
    category,
    description,
    dateFound,
    location
  });

  res.status(201).json({
    success: true,
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
  
