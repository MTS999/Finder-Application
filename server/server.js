import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import {server} from "./socket/socket.js"
import app from "./index.js";

const port = process.env.PORT || 3000;

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("shutting down");
  process.exit(1);
});
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB Atlas");

    // Start the server after successful DB connection
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });


