import React from "react";
import { Image } from "./Image";

export const Comment = () => {
  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-4">
        <Image
          src="userImg.jpeg"
          className="w-10 h-10 rounded-full object-cover"
          w="40"
        />
        <span className="font-medium">John Doe</span>
        <span className="text-sm text-gray-500">2 days ago</span>
      </div>
      <div className="">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi, atque
          soluta aut explicabo cumque libero id voluptates ipsa eaque! Veritatis
          libero accusantium sunt deleniti nam molestiae, blanditiis id culpa
          eum.
        </p>
      </div>
    </div>
  );
};
