import mongoose from "mongoose";
import express from "express"
import cookieParser from 'cookie-parser';
import cors from "cors"
import authRouter from "./Routes/authRouter.js"
import foundItemRoutes from "./Routes/foundItemsRoutes.js";
import lostItemRoutes from "./Routes/lostItemRouter.js"
import messegeRouter from "./Routes/messageRouter.js"
import notificationRouter from "./Routes/notificationRouter.js"
import CustomError from "./utils/CustomError.js";
import { globalErrorHandler } from "./Controller/errorController.js";

import {io,app} from "./socket/socket.js"

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow sending cookies
  }));
// use images from public directly
app.use(express.static("./public"))

app.use("/api/users",authRouter)
app.use('/api/found-items', foundItemRoutes);
app.use('/api/lost-items', lostItemRoutes);
app.use('/api/message', messegeRouter);
app.use('/api/notification', notificationRouter);


app.all('*', (req, res, next) => {
  
    const err = new CustomError(`Can't find ${req.originalUrl} on the server`, 404);
    next(err);
});


app.use(globalErrorHandler);

export default app;