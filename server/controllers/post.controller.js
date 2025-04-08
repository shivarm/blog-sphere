import ImageKit from "imagekit";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

export const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;

  const posts = await Post.find()
    .populate("user", "username")
    .limit(limit)
    .skip((page - 1) * limit); // Skip documents for previous pages

  const totalPost = await Post.countDocuments();
  const hasMore = page * limit < totalPost;
  res.status(200).json({ posts, hasMore });
};

export const getPost = async (req, res) => {
  const { slug } = req.params.slug;
  const post = await Post.findOne(slug)
  .populate("user", "username img")
  res.status(200).json(post);
};

export const createPost = async (req, res) => {
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const user = await User.findOne({ clerkUserId });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  let slug = req.body.title.replace(/ /g, "-").toLowerCase();

  // Check if the slug already exists and generate a unique slug if necessary
  let existingPost = await Post.findOne({ slug });
  let counter = 2;
  while (existingPost) {
    slug = `${slug}-${counter}`;
    existingPost = await Post.findOne({ slug });
    counter++;
  }
  const newPost = new Post({ user: user._id, slug, ...req.body, content: req.body.content });
  const post = await newPost.save();
  res.status(201).json(post);
};

export const updatePost = async (req, res) => {
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const user = await User.findOne({ clerkUserId });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const updatePost = await Post.findOneAndUpdate(
    { _id: req.params.id, user: user._id },
    req.body,
    { new: true }
  );
  if (!updatePost) {
    return res.status(404).send({ error: "Post not found" });
  }
  res.status(200).json({ message: "Post updated" });
};

export const deletePost = async (req, res) => {
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const role = req.auth.sessionClaims?.metadata?.role || "user";

  if (role === "admin") {
    await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json("Post deleted")
  }

  const user = await User.findOne({ clerkUserId });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  
  const deletePost = await Post.findByIdAndDelete({
    _id: req.params.id,
    user: user._id,
  }); // user: user._id for check post belong to user
  if (!deletePost) {
    return res.status(403).send({ error: "You can delete only your posts!" });
  }
  res.status(200).json({ message: "Post deleted" });
};

const imagekit = new ImageKit({
  urlEndpoint: process.env.IK_URL_ENDPOINT,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
});

export const uploadAuth = async (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
};
