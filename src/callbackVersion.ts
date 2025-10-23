import https from "https";
import { WEATHER_API, NEWS_API, displayResults, WeatherData, NewsData } from "./utils";

// Function to fetch JSON data with a callback
function fetchData(url: string, callback: (err: Error | null, data?: any) => void) {
  https.get(url, (res) => {
    let data = "";

    res.on("data", (chunk) => (data += chunk));
    res.on("end", () => {
      try {
        const parsed = JSON.parse(data);
        callback(null, parsed);
      } catch (error) {
        callback(error as Error);
      }
    });
  }).on("error", (err) => callback(err));
}

// Nested callbacks (“callback hell” demo)
fetchData(WEATHER_API, (err, weatherRes) => {
  if (err) return console.error("Error fetching weather:", err);

  const weather: WeatherData = weatherRes.current_weather;

  fetchData(NEWS_API, (err2, newsRes) => {
    if (err2) return console.error("Error fetching news:", err2);

    const news: NewsData[] = newsRes.posts;
    displayResults(weather, news);
  });
});
