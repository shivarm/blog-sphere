import React from "react";
import { PostListItems } from "./PostListItems";
import { useQuery } from '@tanstack/react-query'
import { fetchPosts } from "../apis/apiClient";

export const PostList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () => fetchPosts(),
       
  })
  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message
  
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
