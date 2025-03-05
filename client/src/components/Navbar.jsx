import React, { useState } from "react";
import { Image } from "./Image";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full h-16 md:h-20 flex items-center justify-between">
      <div className="flex items-center gap-4 text-2xl font-bold">
        <Image src="logo.png" alt="logo" w={32} h={32} />
        <span>BlogSphere</span>
      </div>

      {/* mobile button */}
      <div className="md:hidden">
        <div
          className="cursor-pointer text-4xl"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "X" : "☰"}
        </div>

        {/* mobile link list */}
        <div
          className={`bg-red-700 w-full h-screen flex flex-col items-center font-medium gap-8 justify-center absolute top-16 ${
            open ? "right-0" : "right-[100%]"
          }`}
        >
          <a href="/">Home</a>
          <a href="/">Trending</a>
          <a href="/">Most Popular</a>
          <a href="/">About</a>
          <a href="/"></a>
          <button className="bg-blue-800 px-3 text-white font-semibold  py-1 rounded-full">
            Login 👋
          </button>
        </div>
      </div>

      {/* desktop menu */}
      <div className="hidden md:flex font-medium items-center gap-8 xl:gap-12">
        <a href="/">Home</a>
        <a href="/">Trending</a>
        <a href="/">Most Popular</a>
        <a href="/">About</a>
        <a href="/"></a>
        <button className="bg-blue-800 px-3 text-white font-semibold  py-1 rounded-full">
          Login 👋
        </button>
      </div>
    </nav>
  );
};
