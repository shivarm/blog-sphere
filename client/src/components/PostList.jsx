import React from "react";
import { PostListItems } from "./PostListItems";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPosts } from "../apis/apiClient";
import InfiniteScroll from "react-infinite-scroll-component";

export const PostList = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParams = 1 }) => fetchPosts(pageParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
  });
  console.log(data);

  if (isFetching) return "Loading...";

  if (error) return "Something went wrong!";

  const allPost = data?.pages?.flatMap((page) => page.posts) || [];

  return (
    <InfiniteScroll
      dataLength={allPost.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading more posts...</h4>}
      endMessage={
        <p>
          <b>All post loaded!</b>
        </p>
      }
    >
      {allPost.map((post) => (
        <PostListItems key={post._id} post={post} />
      ))}
    </InfiniteScroll>
  );
};
