import React from "react";
import { Image } from "./Image";
import { Link } from "react-router-dom";

export const PostListItems = ({ post }) => {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col xl:flex-row gap-12 mb-8">
      {/* image */}
      {post.img && (
        <div className="md:hidden xl:block xl:w-1/3">
          <Image src={post.img} className="rounded-2xl object-cover" w="735" />
        </div>
      )}
      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link to={`/${post.slug}`} className="text-4xl font-semibold">
          {post.title}
        </Link>

        <div className="flex items-center gap-2 text-gray-700 font-serif">
          <span className="">Written by</span>
          <Link className="text-blue-800">{post.user.username}</Link>
          <span className="">On</span>
          <Link className="text-blue-800">{post.category}</Link>
          <span>{formattedDate}</span>
        </div>
        <p>{post.desc}</p>
        <Link to={`/${post.slug}`} className="text-blue-700 underline text-sm">
          Read More
        </Link>
      </div>
    </div>
  );
};
