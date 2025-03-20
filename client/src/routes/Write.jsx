import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const Write = () => {
  const { quill, quillRef } = useQuill({ placeholder: "123" });

  const { isLoading, isSignedIn } = useUser();

  // if (!isLoading) {
  //   return <div>Loading...</div>
  // }

  if (isLoading && !isSignedIn) {
    return <div>You should login</div>;
  }

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-xl font-light">Create New Post</h1>
      <form className="flex flex-col gap-6 flex-1 mb-6">
        <button className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white ">
          Add a cover image
        </button>
        <input
          type="text"
          placeholder="My Awesome Story"
          className=" text-3xl text-gray-700 outline-none p-1 rounded-xl bg-transparent"
        />
        <div className="flex items-center gap-3">
          <label htmlFor="">Chose a category:</label>
          <select className="rounded-lg p-1 shadow-md">
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="search-engines">Search engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea
          name="desc"
          placeholder="A short description"
          className="p-1 rounded-xl outline-none"
        />
        <div ref={quillRef} className="flex-1 bg-slate-100" />
        <button className="bg-blue-800 w-max px-4 py-2 text-white font-medium rounded-full">
          Send
        </button>
      </form>
    </div>
  );
};

export default Write;
