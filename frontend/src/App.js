import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Feed from "./pages/Feed";

const App = () => {


  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
            path="/feed"
            element={localStorage.getItem("token") ? <Feed /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to={localStorage.getItem("token") ? "/feed" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
