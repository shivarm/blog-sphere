import Post from "../models/post.model.js";

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
  const newPost = new Post(req.body);
  const post = await newPost.save();
  res.status(201).json(post);
};

export const updatePost = async (req, res) => {
  const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updatePost) {
    return res.status(404).send({ error: "Post not found" });
  }
  res.status(200).json({ message: "Post updated" });
};

export const deletePost = async (req, res) => {
  const deletePost = await Post.findByIdAndDelete(req.params.id);
  if (!deletePost) {
    return res.status(404).send({ error: "Post not found" });
  }
  res.status(200).json({ message: "Post deleted" });
};
