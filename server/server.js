import express from "express";

import connectDB from "./db/db.js";
import postRoutes from "./routes/post.route.js"

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/posts", postRoutes);

app.listen(PORT, async (error) => {
  if (error) {
    throw error  
  }
  await connectDB();
  console.log(`Application running on ${PORT}`);
});
