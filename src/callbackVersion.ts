import https from "https";
import {
  WEATHER_API,
  NEWS_API,
  displayResults,
  WeatherData,
  NewsData,
} from "./utils";

// Function to fetch JSON data from a URL using a callback
function fetchData(
  url: string,
  callback: (err: Error | null, data?: any) => void,
) {
  https
    .get(url, (res) => {
      let data = "";

      // Collect chunks of data as they come in
      res.on("data", (chunk) => (data += chunk));

      // Once all data is received
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data); // Parse JSON string
          callback(null, parsed); // Call callback with data
        } catch (error) {
          callback(error as Error); // Call callback with error if JSON parsing fails
        }
      });
    })
    .on("error", (err) => callback(err)); // Call callback on request error
}

// Demonstrate nested callbacks (callback hell)
fetchData(WEATHER_API, (err, weatherRes) => {
  if (err) return console.error("Error fetching weather:", err); // Handle weather fetch error

  const weather: WeatherData = weatherRes.current_weather; // Extract weather data

  // Fetch news data inside the weather callback
  fetchData(NEWS_API, (err2, newsRes) => {
    if (err2) return console.error("Error fetching news:", err2); // Handle news fetch error

    const news: NewsData[] = newsRes.articles; // Extract news articles

    // Display weather and news data
    displayResults(weather, news);
  });
});
