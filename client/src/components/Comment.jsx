import React from "react";
import { Image } from "./Image";

export const Comment = ({ comment }) => {
  // Format the date
  const formattedDate = new Date(comment.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-4">
        {comment.user.img && (
          <Image
            src="userImg.jpeg"
            className="w-10 h-10 rounded-full object-cover"
            w="40"
          />
        )}

        <span className="font-medium">{comment.user.username}</span>
        <span className="text-sm text-gray-500">{formattedDate}</span>
      </div>
      <div className="mt-2">
        <p>{comment.desc}</p>
      </div>
    </div>
  );
};
