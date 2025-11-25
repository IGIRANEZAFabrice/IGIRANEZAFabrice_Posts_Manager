import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../store/postsSlice";
import { useNavigate } from "react-router-dom";

const PostForm = ({ editingPost, clearEditing }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState(editingPost ? editingPost.title : "");
  const [body, setBody] = useState(editingPost ? editingPost.body : "");


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingPost) {
      const result = await dispatch(
        updatePost({ id: editingPost.id, title, body })
      );
      if (result.type === "posts/updatePost/fulfilled") {
        clearEditing();
      }
    } else {
      const result = await dispatch(
        createPost({
          title,
          body,
          date: new Date().toISOString(),
        })
      );
      if (result.type === "posts/createPost/fulfilled") {
        navigate("/");
      }
    }

    // Clear form fields
    setTitle("");
    setBody("");
  };

  return (
    <form
      key={editingPost ? editingPost.id : "new"}
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto section space-y-4"
    >
      <input
        type="text"
        placeholder="Title"
        className="input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Body"
        className="textarea"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <div className="flex space-x-2 justify-end">
        <button type="submit" className="btn btn-success">
          {editingPost ? "Update Post" : "Create Post"}
        </button>
        {editingPost && (
          <button type="button" className="btn btn-gray" onClick={clearEditing}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default PostForm;
