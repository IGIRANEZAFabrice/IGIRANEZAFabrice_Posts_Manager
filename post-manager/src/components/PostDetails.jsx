import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearSelectedPost } from "../store/postsSlice";

const PostDetails = () => {
  const dispatch = useDispatch();
  const { selectedPost } = useSelector((state) => state.posts);

  if (!selectedPost) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-8 bg-white shadow rounded mt-4 space-y-3">
      <h2 className="font-bold text-2xl">{selectedPost.title}</h2>
      <p className="text-gray-700 leading-relaxed">{selectedPost.body}</p>
      <div className="flex justify-end">
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          onClick={() => dispatch(clearSelectedPost())}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PostDetails;
