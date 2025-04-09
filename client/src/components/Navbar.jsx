import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "./Image";

import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/clerk-react";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full h-16 md:h-20 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        <Image src="logo.png" alt="logo" w={32} h={32} />
        <span>BlogSphere</span>
      </Link>

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
          className={`bg-gray-300 w-full h-screen flex flex-col items-center font-medium gap-8 justify-center absolute top-16 ${
            open ? "right-0" : "right-[100%]"
          }`}
        >
          <Link to="/">Home</Link>
          <Link to="/">Trending</Link>
          <Link to="/">Most Popular</Link>
          <Link to="/">About</Link>
          <SignedOut>
            <Link to="/login">
              <button className="bg-blue-800 px-3 text-white font-semibold py-1 rounded-full">
                Login 👋
              </button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      {/* desktop menu */}
      <div className="hidden md:flex font-medium items-center gap-8 xl:gap-12">
        <Link to="/">Home</Link>
        <Link to="/">Trending</Link>
        <Link to="/">Most Popular</Link>
        <Link to="/">About</Link>
        <SignedOut>
          <Link to="/login">
            <button className="bg-blue-800 px-3 text-white font-semibold  py-1 rounded-full">
              Login 👋
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};
