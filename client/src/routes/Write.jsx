import React, { useEffect, useState, useRef } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useQuill } from "react-quilljs";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../apis/apiClient";
import { toast } from "react-toastify";
import { IKContext, IKUpload } from "imagekitio-react";
import { authenticator } from "../apis/apiClient";
import "quill/dist/quill.snow.css";

const Write = () => {
  const { quill, quillRef } = useQuill({
    placeholder: "123",
    modules: {
      toolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
      ],
    },
  });
  const [content, setContent] = useState("");
  const [cover, setCover] = useState("");
  const [progress, setProgress] = useState(0);

  const ref = useRef(null);

  const navigate = useNavigate();

  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return createPost(newPost, token);
    },
    onSuccess: (res) => {
      toast.success("Post has been created!");
      navigate(`/${res.slug}`);
    },
  });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setContent(quill.root.innerHTML);
      });
    }
  }, [quill]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPost = {
      img: cover.filePath || "",
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: content,
    };
    mutation.mutate(newPost);
  };

  const onError = () => {
    toast.error("Image upload fail!");
  };
  const onSuccess = (res) => {
    setCover(res);
    toast.success("Image upload success");
  };

  const onUploadProgress = (progress) => {
    setProgress(Math.round((progress.loaded / progress.total) * 100));
  };

  if (!isLoaded) {
    return <div className="">Loading...</div>;
  }

  if (isLoaded && !isSignedIn) {
    return <div className="">You should login!</div>;
  }

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-xl font-light">Create New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        <button
          onClick={() => ref.current.click()}
          className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white "
        >
          Add a cover image
        </button>
        <IKContext
          publicKey={import.meta.env.VITE_IK_PUBLIC}
          urlEndpoint={import.meta.env.VITE_IK_URL}
          authenticator={authenticator}
        >
          <IKUpload
            useUniqueFileName={true}
            onError={onError}
            onSuccess={onSuccess}
            onUploadProgress={onUploadProgress}
            className="hidden"
            ref={ref}
          />
        </IKContext>
        <input
          type="text"
          placeholder="My Awesome Story"
          name="title"
          className=" text-3xl text-gray-700 outline-none p-1 rounded-xl bg-transparent"
        />
        <div className="flex items-center gap-3">
          <label htmlFor="">Chose a category:</label>
          <select name="category" className="rounded-lg p-1 shadow-md">
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
        {/* Quill Editor */}
        <div ref={quillRef} className="flex-1 bg-slate-100" />
        <button
          disabled={mutation.isPending || (0 < progress && progress < 100)}
          className="bg-blue-800 w-max px-4 py-2 text-white font-medium rounded-full disabled:bg-blue-500 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "Loading..." : "Send"}
        </button>
        {"Progress " + progress}
      </form>
    </div>
  );
};

export default Write;
