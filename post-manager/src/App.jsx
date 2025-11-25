import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import PostForm from "./components/PostForm";
import PostsPage from "./components/PostsPage";
import PostDetailsPage from "./components/PostDetailsPage";
import NewPostPage from "./components/NewPostPage";

function App() {
  const [editingPost, setEditingPost] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      <div className="card px-4 py-3 md:px-6 md:py-4 flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">Post Manager</h1>
        <Link to="/new-post" className="btn btn-primary">
          New Post
        </Link>
      </div>

      <Routes>
        {/* Home Page: Form + Posts List */}
        <Route
          path="/"
          element={
            <>
              <PostForm
                editingPost={editingPost}
                clearEditing={() => setEditingPost(null)}
              />
              <PostsPage setEditingPost={setEditingPost} />
            </>
          }
        />

        {/* Post Details Page */}
        <Route path="/posts/:id" element={<PostDetailsPage />} />

        <Route path="/new-post" element={<NewPostPage />} />
      </Routes>
    </div>
  );
}

export default App;
