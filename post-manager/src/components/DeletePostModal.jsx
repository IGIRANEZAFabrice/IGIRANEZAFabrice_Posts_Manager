// src/components/DeletePostModal.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../store/postsSlice";

const DeletePostModal = ({ postId, onClose }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.posts);

  const handleDelete = async () => {
    await dispatch(deletePost(postId));
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card text-center">
        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
        <p className="mb-4">Are you sure you want to delete this post?</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="btn btn-gray"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className={`btn ${loading ? "btn-muted" : "btn-danger"}`}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePostModal;
