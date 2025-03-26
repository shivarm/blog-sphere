import axios from "axios";

export const fetchPosts = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`);
    return res.data;
  } catch (error) {
    console.error("Error creating post:", error.response.data);
    throw error;
  }
};

export const createPost = async (newPost, token) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/posts`,
      newPost,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error creating post:", error.response.data);
    throw error;
  }
};
