import User from "../Model/userModel.js";
import express from "express";
import CustomError from "../utils/CustomError.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import jwt from "jsonwebtoken";
import util from "util";
import generateTokenAndSetCookie from "../utils/generateToken.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });
};

const createSendResponse = (user, statusCode, response) => {
  const token = signToken(user._id);
  user.password = undefined;
  response.status(statusCode).json({
    status: "success",
    token,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

export const signup = asyncErrorHandler(async (req, res, next) => {
  const newUser = await User.create(req.body);
  // generateTokenAndSetCookie(newUser._id, res);

  createSendResponse(newUser, 201, res);
});

export const login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const err = new CustomError(
      "Please provide email and password for login",
      400
    );
    return next(err);
  }

  const user = await User.findOne({ email });

  if (!user || password !== user.password) {
    const err = new CustomError("Incorrect email or password", 400);
    return next(err);
  }
  // generateTokenAndSetCookie(user._id, res);

  createSendResponse(user, 200, res);
});

export const protect = asyncErrorHandler(async (req, res, next) => {
  const testToken = req.headers.authorization; // Changed to lowercase

  let token
  if(testToken && testToken.startsWith('Bearer ')) {
    token = testToken.split(' ')[1];
  }
   
  if (!token) {
    const err = new CustomError("You are not logged in", 401);
    return next(err);
  }

  const decodedToken = await util.promisify(jwt.verify)(
    token,
    process.env.SECRET_KEY
  );

  const user = await User.findById(decodedToken.id);

  if (!user) {
    const err = new CustomError("User with this token does not exist", 401);
    return next(err);
  }

  req.user = user;
  next();
  // console.log(token);
});

