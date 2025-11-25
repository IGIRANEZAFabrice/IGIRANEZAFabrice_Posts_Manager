import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, deletePost, fetchPostById } from "../store/postsSlice";

const PostList = ({ setEditingPost }) => {
  const dispatch = useDispatch();
  const { post, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

  return (
    <div className="list">
      {post.map((p) => (
        <div key={p.id} className="list-item flex items-start justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-lg font-semibold truncate">{p.title}</h2>
            <p className="text-gray-700 mt-1">
              {p.body && p.body.length > 180 ? p.body.substring(0, 180) + "..." : p.body}
            </p>
          </div>
          <div className="flex-shrink-0 flex items-center space-x-2">
            <button className="btn btn-primary px-3 py-1" onClick={() => dispatch(fetchPostById(p.id))}>
              View
            </button>
            <button className="btn btn-warning px-3 py-1" onClick={() => setEditingPost(p)}>
              Edit
            </button>
            <button className="btn btn-danger px-3 py-1" onClick={() => dispatch(deletePost(p.id))}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
