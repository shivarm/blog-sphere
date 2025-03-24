import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const getPosts = async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
};

export const getPost = async (req, res) => {
  const { slug } = req.params.slug;
  const post = await Post.findOne(slug);
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
  const newPost = new Post({ user: user._id, ...req.body });
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
