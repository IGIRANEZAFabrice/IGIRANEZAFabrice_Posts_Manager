import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById, clearSelectedPost } from "../store/postsSlice";

const PostDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedPost, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPostById(id));

    return () => {
      dispatch(clearSelectedPost());
    };
  }, [dispatch, id]);

  if (loading) return <p className="text-center mt-4">Loading post...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;
  if (!selectedPost) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-8 bg-white shadow rounded space-y-3">
      <h2 className="text-2xl md:text-3xl font-bold">{selectedPost.title}</h2>
      <p className="text-gray-700 leading-relaxed">{selectedPost.body}</p>
      <p className="text-gray-500">ID: {selectedPost.id}</p>
      <div className="flex justify-end">
        <button onClick={() => navigate(-1)} className="btn btn-gray">
          Back
        </button>
      </div>
    </div>
  );
};

export default PostDetailsPage;
