import React from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { Image } from "./Image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../apis/apiClient";
import { toast } from "react-toastify"

export const Comment = ({ comment }) => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const role = user?.publicMetadata?.role;

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return deleteComment(comment._id, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", comment.post] });
      toast.success("Comment deleted successfully");
      
    },
    onError: (error) => {
      console.error(
        "Error deleting comment:",
        error.response?.data || error.message
      );
    },
  });

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this comment?")) {
      deleteMutation.mutate();
    }
  };

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
        {user &&
          (comment.user.username === user.username || role === "admin") && (
            <span
              className="text-xs text-red-300 hover:text-red-500 cursor-pointer"
              onClick={handleDelete}
            >
              delete
              {deleteMutation.isPending && <span>(In progress)</span>}
            </span>
            
          )}
      </div>
      <div className="mt-2">
        <p>{comment.desc}</p>
      </div>
    </div>
  );
};
