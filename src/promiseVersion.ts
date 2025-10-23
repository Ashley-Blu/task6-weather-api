// src/promiseVersion.ts
import axios from "axios";
import { WEATHER_API, NEWS_API, displayResults, WeatherData, NewsData } from "./utils";

// Fetch data returning a Promise
function fetchWeather(): Promise<WeatherData> {
  return axios.get(WEATHER_API).then(res => res.data.current_weather);
}

function fetchNews(): Promise<NewsData[]> {
  return axios.get(NEWS_API).then(res => res.data.posts);
}

Promise.all([fetchWeather(), fetchNews()])
  .then(([weather, news]) => {
    console.log(" Using Promise.all(): Both requests completed");
    displayResults(weather, news);
  })
  .catch(err => console.error(" Error:", err.message))
  .finally(() => {
    // Also demonstrate Promise.race()
    console.log("\n Running Promise.race()...");
    Promise.race([fetchWeather(), fetchNews()])
      .then(result => {
        if ("temperature" in result) {
          console.log("Fastest:  Weather responded first!");
        } else {
          console.log("Fastest:  News responded first!");
        }
      })
      .catch(err => console.error("Race error:", err.message));
  });
