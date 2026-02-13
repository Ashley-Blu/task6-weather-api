// src/asyncAwaitVersion.ts
import axios from "axios";
import {
  WEATHER_API,
  NEWS_API,
  displayResults,
  WeatherData,
  NewsData,
} from "./utils";

async function getWeather(): Promise<WeatherData> {
  const res = await axios.get(WEATHER_API);
  return res.data.current_weather;
}

async function getNews(): Promise<NewsData[]> {
  const res = await axios.get(NEWS_API);
  return res.data.articles;
}

async function main() {
  try {
    console.log(" Fetching weather and news using async/await...");

    // run simultaneously
    const [weather, news] = await Promise.all([getWeather(), getNews()]);

    displayResults(weather, news);
  } catch (err: any) {
    console.error(" Error:", err.message);
  } finally {
    console.log(" Done (async/await version).");
  }
}

main();
