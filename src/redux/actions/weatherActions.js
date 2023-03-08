import { FETCH_WEATHER_REQUEST, FETCH_WEATHER_SUCCESS, FETCH_WEATHER_FAILURE } from '../types';
import { getLocationData } from '../../services/LocationService';

export const fetchWeather = (locationName, useFahrenheit = false) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_WEATHER_REQUEST });

    try {
      const weatherData = await getLocationData(locationName);
      const temperature = useFahrenheit ? weatherData.temperatureFahrenheit : weatherData.temperature;
      const temperatureFahrenheit = useFahrenheit ? weatherData.temperature : weatherData.temperatureFahrenheit;
      const temperatureUnit = useFahrenheit ? '°F' : '°C';
      const data = {
        ...weatherData,
        temperature,
        temperatureFahrenheit,
        temperatureUnit,
        isCelsius: !useFahrenheit,
      };
      dispatch({ type: FETCH_WEATHER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_WEATHER_FAILURE, payload: error.message });
    }
  };
};
