import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || window.location.origin;

if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not defined. Please set VITE_API_URL in your environment.");
}

export const fetchPosts = async (pageParams) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/posts`, {
      params: { page: pageParams, limit: 2 },
    });
    return res.data;
  } catch (error) {
    console.error("Error while fetching  posts:", error.response.data);
    throw error;
  }
};

export const fetchPost = async (slug) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/api/posts/${slug}`
    );
    return res.data;
  } catch (error) {
    console.error("Error while fetching single post:", error.response.data);
    throw error;
  }
};

export const authenticator = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/posts/upload-auth`
    );

    // Validate the response data
    const { signature, expire, token } = response.data;

    if (!signature || !expire || !token) {
      console.error("Invalid response format:", response.data);
      throw new Error(
        "Authentication response is missing required fields (signature, expire, token)."
      );
    }

    // Return the parsed data
    return { signature, expire, token };
  } catch (error) {
    // Handle and log errors
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error(
        `Authentication request failed with status ${error.response.status}:`,
        error.response.data
      );
      throw new Error(
        `Request failed with status ${error.response.status}: ${
          error.response.data.message || error.response.data
        }`
      );
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received:", error.request);
      throw new Error("No response received from the server.");
    } else {
      // Something else caused the error
      console.error("Error during authentication request:", error.message);
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  }
};

export const createPost = async (newPost, token) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/api/posts`,
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

export const deletePost = async (postId, token) => {
  try {
    const res = await axios.delete(
      `${API_BASE_URL}/api/posts/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error deleting post:", error.response.data);
    throw error;
  }
};

export const fetchComment = async (postId) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/api/comments/${postId}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching comment:", error.response.data);
    throw error;
  }
};
export const addComment = async (postId, newComment, token) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/api/comments/${postId}`,
      newComment,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error creating new comment:", error.response.data);
    throw error;
  }
};

export const deleteComment = async (commentId, token) => {
  try {
    const res = await axios.delete(
      `${API_BASE_URL}/api/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error deleting comment:", error.response?.data || error.message);
    throw error;
  }
};

export const savedPost = async (token) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/api/users/saved`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(
      "Error fetching saved post:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const savePost = async (postId, token) => {
  try {
    const res = await axios.patch(
      `${API_BASE_URL}/api/users/save`,
      { userId: postId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error saving post:", error.response?.data || error.message);
    throw error;
  }
};
