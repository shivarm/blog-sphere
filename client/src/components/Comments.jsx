import React from "react";
import { Comment } from "./Comment";

export const Comments = () => {
  return (
    <div className="flex flex-col gap-8 lg:w-3/5">
      <h1 className="text-xl text-gray-500 underline">Comments</h1>
      <div className="flex justify-between items-center gap-3 w-full">
        <textarea
          placeholder="Add a comment..."
          className="w-full p-4 rounded-xl outline-none"
        />
        <button className="bg-blue-800 px-4 py-3 rounded-xl text-white font-medium">
          Send
        </button>
      </div>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
};
