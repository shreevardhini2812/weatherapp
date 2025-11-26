import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css';

const App = () => {

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>

        {/* If token exists → go home, else → login */}
        <Route path="/" element={
          localStorage.getItem("token") ? <Navigate to="/home" /> : <Login />
        } />

        {/* Protected Route */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/register" element={<Register />} />

      </Routes>
    </div>
  );
};

export default App;
