import axios from "axios";
import {
  WEATHER_API,
  NEWS_API,
  displayResults,
  WeatherData,
  NewsData,
} from "./utils";

// Function to fetch weather data, returns a Promise
function fetchWeather(): Promise<WeatherData> {
  return axios.get(WEATHER_API).then((res) => res.data.current_weather);
}

// Function to fetch news data, returns a Promise
function fetchNews(): Promise<NewsData[]> {
  return axios.get(NEWS_API).then((res) => res.data.articles);
}

// Run both requests in parallel and wait for both to complete
Promise.all([fetchWeather(), fetchNews()])
  .then(([weather, news]) => {
    console.log(" Using Promise.all(): Both requests completed");
    displayResults(weather, news); // Display results once both requests finish
  })
  .catch((err) => console.error(" Error:", err.message)) // Handle any errors
  .finally(() => {
    // Demonstrate Promise.race() to see which request completes first
    console.log("\n Running Promise.race()...");
    Promise.race([fetchWeather(), fetchNews()])
      .then((result) => {
        if ("temperature" in result) {
          console.log("Fastest:  Weather responded first!");
        } else {
          console.log("Fastest:  News responded first!");
        }
      })
      .catch((err) => console.error("Race error:", err.message)); // Handle race errors
  });
