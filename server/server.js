import express from "express";
import cors from "cors"
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js"
import clerkRoutes from "./routes/webhook.route.js"

import { clerkMiddleware } from '@clerk/express'

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(cors({
  origin: process.env.ORIGIN
}));
app.use(clerkMiddleware())
app.use("/webhooks", clerkRoutes);
app.use(express.json());

// allow cross-origin requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use(express.static(path.resolve(__dirname, "../client/dist")));

// Handle all other routes by serving the index.html file
app.get('/{*file}', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message || "Something went wrong",
    status: error.status,
    stack: error.stack,
  });
});

app.listen(PORT, async (error) => {
  if (error) {
    throw error;
  }
  await connectDB();
  console.log(`Application running on ${PORT}`);
});
