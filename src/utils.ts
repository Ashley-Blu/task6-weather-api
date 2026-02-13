// API endpoints
export const WEATHER_API =
  "https://api.open-meteo.com/v1/forecast?latitude=-25.74&longitude=28.19&current_weather=true"; 
// Weather API - returns current weather information

export const NEWS_API =
  "https://gnews.io/api/v4/search?q=Google&lang=en&max=5&apikey=c082a2abd3a1b6311cc913dd9c88fe28"; 
// News API - returns latest news headlines

// Type definition for weather data
export type WeatherData = {
  temperature: number;    // Temperature in Celsius
  windspeed: number;      // Wind speed in km/h
  weathercode: number;    // Weather condition code
  winddirection: number;  // Wind direction in degrees
  time: number;           // Current UTC time from API
  interval: number;       // Data update interval in seconds
  is_day: number;         // 1 = Day, 0 = Night
};

// Type definition for news data
export type NewsData = {
  title: string;          // Headline title
  description: string;    // Short description
  url: string;            // Link to full article
  publishedAt: string;    // Publication date
};

// Function to display results in the console
export function displayResults(
  weather: WeatherData | null,
  news: NewsData[] | null,
) {
  console.log("\n WEATHER DATA:");
  if (weather) {
    console.log(`Temperature: ${weather.temperature} °C`);
    console.log(`Wind Speed: ${weather.windspeed} km/h`);
    console.log(`Wind Direction: ${weather.winddirection} °`);
    console.log(`Weather Code: ${weather.weathercode}`);
    console.log(`Day/Night: ${weather.is_day === 1 ? "Day" : "Night"}`);
    console.log(`Time (UTC): ${weather.time}`);
    console.log(`Update Interval: ${weather.interval} seconds`);
  } else {
    console.log("Failed to fetch weather data.");
  }

  console.log("\n LATEST NEWS HEADLINES:");
  if (news) {
    news.slice(0, 5).forEach((n, i) => console.log(`${i + 1}. ${n.title}`));
  } else {
    console.log("Failed to fetch news data.");
  }
}
