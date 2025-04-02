import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser, useAuth } from "@clerk/clerk-react";
import { fetchComment } from "../apis/apiClient";
import { addComment } from "../apis/apiClient";
import { Comment } from "./Comment";

export const Comments = ({ postId }) => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const { isPending, error, data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComment(postId),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newComment) => {
      const token = await getToken();
      return addComment(postId, newComment, token); 
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: (error) => {
      console.error(
        "Error adding comment:",
        error.response?.data || error.message
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      desc: formData.get("desc"),
    };

    mutation.mutate(data);
  };

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Something went wrong: {error.message}</div>;

  return (
    <div className="flex flex-col gap-8 lg:w-3/5">
      <h1 className="text-xl text-gray-500 underline">Comments</h1>
      <form
        onSubmit={handleSubmit}
        className="flex justify-between items-center gap-3 w-full"
      >
        <textarea
          name="desc"
          placeholder="Add a comment..."
          className="w-full p-4 rounded-xl outline-none"
        />
        <button className="bg-blue-800 px-4 py-3 rounded-xl text-white font-medium">
          Send
        </button>
      </form>
      {isPending ? (
        "Loading..."
      ) : error ? (
        "Error loading comments!"
      ) : (
        // react query optimistic mutation
        <>
          {mutation.isPending && (
            <Comment
              comment={{
                desc: `${mutation.variables.desc} (Sending...)`,
                createdAt: new Date(),
                user: {
                  img: user.imageUrl,
                  username: user.username,
                },
              }}
            />
          )}

          {data.map((comment) => (
            <Comment key={comment._id} comment={comment} postId={postId} />
          ))}
        </>
      )}
    </div>
  );
};
