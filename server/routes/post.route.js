import express from "express";
const router = express.Router();

import { getPosts, getPost } from "../controllers/post.controller.js";

router.get("/", getPosts);
router.get("/:slug", getPost);
 

export default router;