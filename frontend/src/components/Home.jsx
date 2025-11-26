import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token"));

  // Redirect if token missing
  useEffect(() => {
    if (!token) navigate("/");
  }, [token, navigate]);

  const getWeather = async () => {
    if (!city) return;

    try {
      const res = await axios.get(`https://weatherapp-kk03.onrender.com/api/weather/${city}`, {
        headers: { Authorization: `Bearer ${token}` }, // ✅ "Bearer " included
      });
      setWeather(res.data);
      setError("");
    } catch (err) {
      setWeather(null);
      if (err.response?.status === 401) setError("Unauthorized: please login");
      else if (err.response?.status === 404) setError("City not found");
      else setError("Something went wrong");
      console.log(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-green-400 rounded shadow relative left-120 top-20 text-black">
      <h2 className="text-2xl font-bold mb-4">Check Weather</h2>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={e => setCity(e.target.value.trim())}
          className="p-2 border rounded flex-1"
        />
        <button onClick={getWeather} className="bg-blue-500 text-black p-2 rounded">Search</button>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {weather && (
        <div className="mt-4">
          <h3 className="text-xl font-bold">{weather.name}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
