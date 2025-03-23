import express from "express";
const router = express.Router();

import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
} from "../controllers/post.controller.js";

router.get("/", getPosts);
router.get("/:slug", getPost);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
