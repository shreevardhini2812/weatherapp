import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://weatherapp-kk03.onrender.com/api/auth/login", { email, password });

      // Save token first
      localStorage.setItem("token", res.data.token);
      console.log("Token saved:", res.data.token);

      navigate("/home"); // then navigate
    } catch (err) {
      setError(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="relative left-120 max-w-md mx-auto mt-20 p-6 bg-green-400 rounded shadow">
      <h2 className="text-2xl font-bold text-black mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="p-2 border rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="p-2 border rounded" required />
        <button type="submit" className="bg-blue-500 text-black p-2 rounded">Login</button>
      </form>
      <p className="mt-4 ">Don't have an account? <Link to="/register" className="text-black">Register</Link></p>
    </div>
  );
};

export default Login;
