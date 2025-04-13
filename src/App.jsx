import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  let [city, setCity] = useState("");
  let [weather, setWeather] = useState(null);
  let [themeDark, setThemeDark] = useState(false);
  let [dateTime, setDateTime] = useState("");

  let formatDate = () => {
    let days = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
    ];
    let months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];

    let now = new Date();
    let year = now.getFullYear();
    let month = months[now.getMonth()];
    let day = now.getDate();
    let hours = now.getHours().toString().padStart(2, "0");
    let minutes = now.getMinutes().toString().padStart(2, "0");

    return `${days[now.getDay()]}, ${month} ${day}, ${year} ${hours}:${minutes}`;
  };

  useEffect(() => {
    setDateTime(formatDate());
  }, []);

  let handleSearch = async (event) => {
    event.preventDefault();
    if (!city) return;

    let apiKey = "4b3503b2f08a729413c4d33ef1186004";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
      let response = await axios.get(apiUrl);
      let data = response.data;
      setWeather({
        temp: Math.round(data.main.temp),
        city: data.name,
      });
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  let toggleTheme = () => {
    setThemeDark(!themeDark);
  };

  return (
    <div className={themeDark ? "App dark" : "App"}>
      <div className="container text-center card">
        <h1>Weather App</h1>
        <div id="datetime">{dateTime}</div>

        <form id="search-form" onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            autoFocus
          />
          <button type="submit" className="btn btn-primary ms-2">
            Search
          </button>
        </form>

        <div className="form-check form-switch mt-3">
          <input
            className="form-check-input"
            type="checkbox"
            onClick={toggleTheme}
            checked={themeDark}
            readOnly
          />
          <label className="form-check-label">Dark Mode</label>
        </div>

        {weather && (
          <h2 className="temp">
            {weather.temp}°F in {weather.city}
          </h2>
        )}
      </div>
    </div>
  );
}
