import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"; // import the CSS

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1 onClick={() => navigate("/feed")}>LinkedIn Clone</h1>

      <div className="navbar-right">
        <span>{user ? `Hello, ${user.name || user.email}` : ""}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
