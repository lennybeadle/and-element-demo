import {
  ADD_LOCATION,
  DELETE_LOCATION,
  UPDATE_LOCATION,
  EDIT_LOCATION,
  TOGGLE_FAVOURITE,
  TOGGLE_TEMPERATURE_UNIT,
} from '../types';
import { fetchWeather } from './weatherActions';
export const addLocation = (location) => (dispatch, getState) => {
    // Generate a unique id for the new location
    const newLocation = {
      ...location
    };
  
    dispatch({
      type: ADD_LOCATION,
      payload: newLocation,
    });
  
    const { locations } = getState().location;
    localStorage.setItem('locations', JSON.stringify(locations));
  };
  
  export const deleteLocation = (index) => (dispatch, getState) => {
    dispatch({
      type: DELETE_LOCATION,
      payload: index,
    });
  
    const { locations } = getState().location;
    localStorage.setItem('locations', JSON.stringify(locations));
  };
  
  export const editLocation = (index) => {
    return {
      type: EDIT_LOCATION,
      payload: index,
    };
  };

  export const updateLocation = (location, index) => (dispatch) => {
    console.log('Updating locationnn:', location, 'index:', index);
    dispatch({
      type: UPDATE_LOCATION,
      payload: { location, index },
    });
    const storedLocations = JSON.parse(localStorage.getItem('locations')) || [];
    storedLocations[index] = location;
    localStorage.setItem('locations', JSON.stringify(storedLocations));
  };
  
  
  export const toggleTemperatureUnit = () => (dispatch, getState) => {
    dispatch({ type: TOGGLE_TEMPERATURE_UNIT });
  
    const { locations } = getState().location;
    const isCelsius = getState().location.isCelsius;
  
    locations.forEach((location) => {
      dispatch(fetchWeather(location.name, !isCelsius));
    });
  
  };
  
  export const toggleFavourite = (index) => (dispatch, getState) => {
    dispatch({
      type: TOGGLE_FAVOURITE,
      payload: index,
    });
  
    const { locations } = getState().location;
    localStorage.setItem('locations', JSON.stringify(locations));
  };
  