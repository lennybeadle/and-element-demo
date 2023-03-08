import {
    FETCH_WEATHER_REQUEST,
    FETCH_WEATHER_SUCCESS,
    FETCH_WEATHER_FAILURE,
  } from '../types';
  
  const initialState = {
    data: {},
    error: null,
    isLoading: false,
  };
  
  const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_WEATHER_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case FETCH_WEATHER_SUCCESS:
        const { name, temperature, temperatureFahrenheit, temperatureUnit, forecast } = action.payload;
        return {
          ...state,
          isLoading: false,
          data: {
            ...state.data,
            [name]: {
              temperature,
              temperatureFahrenheit,
              temperatureUnit,
              forecast,
            },
          },
          error: null,
        };
      case FETCH_WEATHER_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default weatherReducer;
  