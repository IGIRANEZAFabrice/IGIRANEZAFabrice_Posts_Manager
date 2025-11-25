import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../store/postsSlice";
import { useNavigate } from "react-router-dom";

const NewPostPage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.posts);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dispatch create post thunk
    const result = await dispatch(createPost({ title, body }));

    if (result.type === "posts/createPost/fulfilled") {
      setSuccessMsg("Post created successfully!");
      setTitle("");
      setBody("");
      navigate("/");
    }
  };

  return (
    <div className="max-w-3xl mx-auto section space-y-4">
      <h2 className="text-2xl md:text-3xl font-bold">Create New Post</h2>

      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <form className="space-y-4" onSubmit={handleSubmit}>
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
        <button
          type="submit"
          className={`btn ${loading ? "btn-muted" : "btn-success"}`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default NewPostPage;
