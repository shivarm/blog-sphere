import React from "react";
import { Image } from "./Image";
import { Link } from "react-router-dom";

export const PostListItems = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-8">
      {/* image */}
      <div className="md:hidden xl:block xl:w-1/3">
        <Image src="postImg.jpeg" className="rounded-2xl object-cover" />
      </div>
      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link to="/test" className="text-4xl font-semibold">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </Link>

        <div className="flex items-center gap-2 text-gray-400">
          <span className="">Written by</span>
          <Link className="text-blue-800">Shivam</Link>
          <span className="">On</span>
          <Link className="text-blue-800">Web Desing</Link>
          <span>2 days ago</span>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima itaque
          labore tenetur animi quia corrupti doloribus repudiandae fuga quaerat
          nisi repellat expedita placeat, vitae facere libero. Officiis, illum
          quis! Nam.
        </p>
        <Link to="/test" className="text-blue-700 underline text-sm">
          Read More
        </Link>
      </div>
    </div>
  );
};
