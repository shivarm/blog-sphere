import React from "react";
import { PostListItems } from "./PostListItems";

export const PostList = () => {
  return (
    <div className="flex flex-col gap-12 mb-8">
      <PostListItems />
      <PostListItems />
      <PostListItems />
      <PostListItems />
      <PostListItems />
      <PostListItems />
    </div>
  );
};
