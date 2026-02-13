// src/asyncAwaitVersion.ts
import axios from "axios";
import {
  WEATHER_API,
  NEWS_API,
  displayResults,
  WeatherData,
  NewsData,
} from "./utils";

// Function to fetch weather data from API
async function getWeather(): Promise<WeatherData> {
  const res = await axios.get(WEATHER_API);
  return res.data.current_weather; // Return current weather object
}

// Function to fetch news data from API
async function getNews(): Promise<NewsData[]> {
  const res = await axios.get(NEWS_API);
  return res.data.articles; // Return list of news articles
}

// Main function to run both API calls asynchronously
async function main() {
  try {
    console.log("Fetching weather and news using async/await...");

    // Run both requests at the same time
    const [weather, news] = await Promise.all([getWeather(), getNews()]);

    // Display the results in console
    displayResults(weather, news);
  } catch (err: any) {
    console.error("Error:", err.message); // Catch and log errors
  } finally {
    console.log("Done (async/await version)."); // Always execute at the end
  }
}

// Run the main function
main();
