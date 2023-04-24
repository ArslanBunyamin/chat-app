import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
function App() {
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home color={randomColor} />} />
      </Routes>
    </Router>
  );
}

export default App;
