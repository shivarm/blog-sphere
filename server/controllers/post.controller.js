import Post from "../models/post.model.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    throw new Error(`Error while fetching posts ${error.message}`);
  }
};

export const getPost = async (req, res) => {
  const { slug } = req.params.slug;
  try {
    const post = await Post.findOne(slug);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    throw new Error(`Error while fetching post ${error.message}`);
  }
};
