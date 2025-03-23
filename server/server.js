import express from "express";

import connectDB from "./db/db.js";
import postRoutes from "./routes/post.route.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.use("/api/posts", postRoutes);

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
