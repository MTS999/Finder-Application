import {Server} from "socket.io"
import http from "http"

import express from "express"

const app=express()

const server=http.createServer(app)

const io=new Server(server,{
    cors: {
        origin: "http://localhost:5173", // Frontend URL
        // credentials: true, // Allow sending cookies
        methods: ["GET", "POST"],

    },
})
export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};
const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket)=>{
    console.log(`User connected: ${socket.id}`)


    const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;
  console.log(userSocketMap);


    socket.on("disconnect", ()=>{
        console.log(`User disconnected: ${socket.id}`)
    })

    
})

export { app, io, server };
