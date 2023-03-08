import axios from 'axios';

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export const getLocationData = async (locationName) => {
  const currentUrl = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${locationName}`;
  const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${locationName}&days=7&aqi=no&alerts=no`;

  const [currentResponse, forecastResponse] = await Promise.all([axios.get(currentUrl), axios.get(forecastUrl)]);
  
  const { location, current } = currentResponse.data;

  const data = {
    name: location.name,
    temperature: current.temp_c,
    temperatureFahrenheit: current.temp_f,
    isFavourite: false,
    conditionText: current.condition.text,
    conditionCode: current.condition.code,
    windSpeed: current.wind_kph,
    humidity: current.humidity,
    forecast: forecastResponse.data.forecast.forecastday,
  };

  return data;
};


export const getLocationOptions = async (value) => {
  const url = `https://api.weatherapi.com/v1/search.json?key=${WEATHER_API_KEY}&q=${value}`;
  const response = await axios.get(url);
  const options = response.data.map((result) => result.name);

  return options;
};
