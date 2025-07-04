import { useState } from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "aaeb5b4bb6959dc09b54e201f0a623ff";

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (!input) {
      setWeather(null);
      setForecast(null);
      setError("No city name entered");
      return;
    }

    try {
      // Current weather
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${API_KEY}&units=metric`;
      const response = await axios.get(url);
      setWeather(response.data);

      // Forecast (next 3 hours)
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${API_KEY}&units=metric`;
      const forecastRes = await axios.get(forecastUrl);
      setForecast(forecastRes.data);

      setError("");
    } catch (err) {
      setError("City not found. Please try again.");
      setWeather(null);
      setForecast(null);
    }
  }

  // Rain chance for current weather
  let rainChance = null;
  if (weather && weather.rain && weather.rain["1h"] !== undefined) {
    rainChance = weather.rain["1h"];
  }

  // Find next rain in forecast
  let nextRain = null;
  if (forecast && forecast.list) {
    for (let item of forecast.list) {
      // OpenWeatherMap provides "pop" (probability of precipitation, 0-1) in forecast
      if (!nextRain && item.rain && item.rain["3h"] > 0) {
        nextRain = {
          time: item.dt_txt,
          amount: item.rain["3h"],
          pop: item.pop !== undefined ? Math.round(item.pop * 100) : null // percentage
        };
      }
    }
  }

  return (
    <div className="weather-container">
      <form className="weather-form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={input}
          onChange={handleInputChange}
        />
        <button type="submit">Get Weather</button>
      </form>
      <div className="weather-output">
      {error && <p className="error">{error}</p>}
      {weather && !error && (
        <div className="weather-info">
          <p className="temp">{weather.main.temp}°C</p>
          <p>{weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
          <p>
            Rain (last 1h):{" "}
            {rainChance !== null ? `${rainChance} mm` : "No rain"}
          </p>
          {nextRain && (
            <p>
              <b>Rain chance today:</b>{" "}
              {typeof nextRain.pop === "number"
                ? `${nextRain.pop}%`
                : "N/A"}
            </p>
          )}
        </div>
      )}
      </div>
    </div>
  );
}