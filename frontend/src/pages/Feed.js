import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Createpost from "../components/Createpost";
import "./Feed.css";
import api from "../api";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  // Fetch posts
  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);

    fetchPosts();
  }, []);

  // Delete a post
  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove post locally
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("You can only delete your own posts.");
    }
  };

  return (
    <div className="feed-page">
      <Navbar user={user} setUser={setUser} />
      <div className="feed-container">
        <Createpost refreshPosts={fetchPosts} />
        <div className="posts-list">
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              <div className="post-header">
                <h2>{post.userName || "Anonymous"}</h2>
                {user && (post.user?._id === user._id || post.user?._id === user.id) && (
                    <button className="delete-btn" onClick={() => handleDelete(post._id)}>
                      ✖
                    </button>
                  )}

              </div>
              <p>{post.text}</p>
              <p className="timestamp">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feed;
