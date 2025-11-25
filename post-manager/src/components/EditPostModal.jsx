import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../store/postsSlice";

const EditPostModal = ({ post, onClose }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.posts);

  const [title, setTitle] = useState(post ? post.title : "");
  const [body, setBody] = useState(post ? post.body : "");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(updatePost({ id: post.id, title, body }));

    if (result.type === "posts/updatePost/fulfilled") {
      setSuccessMsg("Post updated successfully!");
      // Hide success after 2s and close modal
      setTimeout(() => {
        setSuccessMsg("");
        onClose();
      }, 2000);
    }
  };

  if (!post) return null;

  return (
    <div key={post?.id} className="modal-overlay">
      <div className="modal-card relative">
        <h2 className="text-xl font-bold mb-4">Edit Post</h2>

        {successMsg && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-2">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            required
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="textarea min-h-[140px]"
            required
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-gray px-3 py-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`btn px-3 py-1 ${loading ? "btn-muted" : "btn-warning"}`}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;
