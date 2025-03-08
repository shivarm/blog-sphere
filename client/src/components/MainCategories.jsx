import React from "react";
import { Link } from "react-router-dom";

export const MainCategories = () => {
  return (
    <div className="hidden md:flex items-center justify-center gap-8 bg-white md:rounded-3xl xl:rounded-full p-4 shadow-lg">
      {/* links */}
      <div className="flex flex-1 tems-center justify-between i flex-wrap">
        <Link
          to="/post"
          className="bg-blue-800 px-4 py-2 text-white rounded-full"
        >
          All Posts
        </Link>
        <Link
          to="/post?cat=web-design"
          className="hover:bg-blue-50 px-4 py-2 rounded-full"
        >
          Web Design
        </Link>
        <Link
          to="/post?cat=development"
          className="hover:bg-blue-50 px-4 py-2 rounded-full"
        >
          Development
        </Link>

        <Link
          to="/post?cat=databases"
          className="hover:bg-blue-50 px-4 py-2 rounded-full"
        >
          Databases
        </Link>

        <Link
          to="/post?cat=seo"
          className="hover:bg-blue-50 px-4 py-2 rounded-full"
        >
          SEO
        </Link>

        <Link
          to="/post?cat="
          className="hover:bg-blue-50 px-4 py-2 rounded-full"
        >
          Marketing
        </Link>
      </div>
      <span className="font-medium text-xl">|</span>
      {/* search  */}
      <div className="bg-gray-100 p-2 rounded-full flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="gray"
        >
          <circle cx="10.5" cy="10.5" r="7.5" />
          <line x1="16.5" y1="16.5" x2="22" y2="22" />
        </svg>
        <input
          type="search"
          placeholder="search a post"
          className="bg-transparent outline-none placeholder:text-gray-500"
        />
      </div>
    </div>
  );
};
