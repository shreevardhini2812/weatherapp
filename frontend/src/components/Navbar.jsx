import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-green-400 relative left-120 top-10 rounded text-white p-4 flex justify-between">
      <h1 className="text-black">Weather App</h1>
      <div>
        {token ? (
          <button onClick={logout} className="px-3 py-1 text-black relative top-3 left-2 rounded">Logout</button>
        ) : (
          <Link to="/register" className="mr-4 relative top-20 right-38">Register</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
