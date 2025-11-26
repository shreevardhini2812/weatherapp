import express from "express";
import axios from "axios";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:city", authMiddleware, async (req, res) => {
  const { city } = req.params;
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      { params: { q: city, appid: apiKey, units: "metric" } }
    );
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({ message: error.response.data.message });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
});

export default router;
