import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema(
  {
    
    clerkUserId: {
      type: String,
      require: true,
      unique: true,
    },
    
    username: {
      type: String,
      require: true,
      unique: true,
    },

    email: {
      type: String,
      require: true,
      unique: true,
    },

    img: {
      type: String,
    },

    savedPosts: {
      type: [String],
      default: [],
    },
  },

  { timestamps: true }
);

export default mongoose.model("User", userSchema);
