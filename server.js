// server.js
const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

// Replace with your own OpenWeatherMap API key
const API_KEY = "YOUR_API_KEY";

app.use(express.static(path.join(__dirname, "public")));

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: "City is required" });

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      }
    );

    const data = response.data;
    res.json({
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather[0].description,
    });
  } catch (error) {
    res.status(404).json({ error: "City not found" });
  }
});

app.listen(PORT, () => console.log(`🌤️ Server running on http://localhost:${PORT}`));
