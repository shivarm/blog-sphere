import React from "react";
import { Link, useParams } from "react-router-dom";
import { Image } from "../components/Image";
import { PostMenuAction } from "../components/PostMenuAction";
import { Search } from "../components/Search";
import { Comments } from "../components/Comments";
import { useQuery } from "@tanstack/react-query";
import { fetchPost } from "../apis/apiClient";

const SinglePostPage = () => {
  const { slug } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });
  console.log(data);
  // Handle loading state
  if (isPending) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Something went wrong: {error.message}</div>;
  }
  if (!data) return "Post not found!";
  // Format the date
  const formattedDate = new Date(data.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="flex flex-col gap-8">
      {/* details */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text:xl md:text-3xl xl:text-5xl font-semibold">
             {data.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span className="">Written by</span>
            <Link className="text-blue-800">{data.user.username}</Link>
            <span className="">On</span>
            <Link className="text-blue-800">{data.category}</Link>
            <span>{formattedDate}</span>
          </div>
          <p className="text-gray-500 font-medium">
            {data.desc}
          </p>
        </div>
        {data.img && <div className="hidden lg:block w-2/5">
          <Image
            src={data.img}
            w="600"
            className="rounded-2xl object-cover"
          /> 
        </div>
        }
      </div>
      {/* content */}
      <div className="flex flex-col md:flex-row gap-12">
        <div className="lg:text-lg flex flex-col gap-5 text-justify">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            commodi amet voluptate corrupti nihil dolorum, odio magni doloremque
            dolore ab, in omnis quaerat? Nemo, fuga voluptatem aspernatur ullam
            doloremque consequuntur.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
            aperiam laborum ullam rerum quod pariatur labore tempore magnam
            deleniti nemo? Est quod ratione minus sequi commodi eveniet rem
            corrupti facilis?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            commodi amet voluptate corrupti nihil dolorum, odio magni doloremque
            dolore ab, in omnis quaerat? Nemo, fuga voluptatem aspernatur ullam
            doloremque consequuntur.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
            aperiam laborum ullam rerum quod pariatur labore tempore magnam
            deleniti nemo? Est quod ratione minus sequi commodi eveniet rem
            corrupti facilis?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            commodi amet voluptate corrupti nihil dolorum, odio magni doloremque
            dolore ab, in omnis quaerat? Nemo, fuga voluptatem aspernatur ullam
            doloremque consequuntur.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
            aperiam laborum ullam rerum quod pariatur labore tempore magnam
            deleniti nemo? Est quod ratione minus sequi commodi eveniet rem
            corrupti facilis?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            commodi amet voluptate corrupti nihil dolorum, odio magni doloremque
            dolore ab, in omnis quaerat? Nemo, fuga voluptatem aspernatur ullam
            doloremque consequuntur.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
            aperiam laborum ullam rerum quod pariatur labore tempore magnam
            deleniti nemo? Est quod ratione minus sequi commodi eveniet rem
            corrupti facilis?
          </p>
        </div>
        {/* menu */}
        <div className="px-4 h-max sticky top-8">
          <h1 className=" mb-4 text-sm font-medium">Author</h1>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-5">
            {data.user.img && (
                <Image
                  src={data.user.img}
                  className="w-12 h-12 rounded-full object-cover"
                  w="48"
                  h="48"
                />
              )}
              <Link className="text-blue-800">{data.user.username}</Link>
            </div>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit lo{" "}
            </p>
            <div className="flex gap-2">
              <Link to="https://x.com" target="_blank">
                <Image src="twitter.svg" />
              </Link>
              <Link to="https://www.reddit.com" target="_blank">
                <Image src="reddit.svg" />
              </Link>
              <Link to="https://www.instagram.com" target="_blank">
                <Image src="instagram.svg" />
              </Link>
            </div>
          </div>
          <PostMenuAction />
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm ">
            <Link to="/" className="underline">
              All
            </Link>
            <Link to="/" className="underline">
              Web Design
            </Link>
            <Link to="/" className="underline">
              Development
            </Link>
            <Link to="/" className="underline">
              Database
            </Link>
            <Link to="/" className="underline">
              search Engines
            </Link>
            <Link to="/" className="underline">
              Marketing
            </Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search />
        </div>
      </div>
      <Comments />
    </header>
  );
};

export default SinglePostPage;
