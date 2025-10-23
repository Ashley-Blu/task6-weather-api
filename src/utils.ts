export const WEATHER_API = "https://api.open-meteo.com/v1/forecast?latitude=-25.74&longitude=28.19&current_weather=true";//weather api - returns weather information
export const NEWS_API = "https://gnews.io/api/v4/search?q=Google&lang=en&max=5&apikey=c082a2abd3a1b6311cc913dd9c88fe28"; //news api - Gives us news headlines

//The weather features we want to display
export type WeatherData = {
  temperature: number;
  windspeed: number;
  weathercode: number;
};

export type NewsData = {
  id: number;
  title: string;
};

export function displayResults(weather: WeatherData | null, news: NewsData[] | null) {
  console.log("\n WEATHER DATA:");
  if (weather) {
    console.log(`Temperature: ${weather.temperature}°C`);
    console.log(`Wind Speed: ${weather.windspeed} km/h`);
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
