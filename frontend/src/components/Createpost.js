import React, { useState } from "react";
import api from "../api";
import "./Createpost.css"; // import the CSS

const Createpost = ({ refreshPosts }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/posts",
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setText("");
      refreshPosts(); // refresh the feed
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-post-form">
      <textarea
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default Createpost;
