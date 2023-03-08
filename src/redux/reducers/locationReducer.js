import {
    ADD_LOCATION,
    DELETE_LOCATION,
    UPDATE_LOCATION,
    EDIT_LOCATION,
    TOGGLE_FAVOURITE,
    TOGGLE_TEMPERATURE_UNIT,
  } from '../types';
  
  const initialState = {
    locations: [],
    editingIndex: null,
    isCelsius: true,
  };
  
  const locationReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_LOCATION:
        return {
          ...state,
          locations: [...state.locations, action.payload],
        };
      case DELETE_LOCATION:
        return {
          ...state,
          locations: state.locations.filter((location, index) => index !== action.payload),
        };
      case EDIT_LOCATION:
        return {
          ...state,
          editingIndex: action.payload,
        };
      case UPDATE_LOCATION:
        const { location, index } = action.payload;
        return {
          ...state,
          locations: [
            ...state.locations.slice(0, index),
            location,
            ...state.locations.slice(index + 1),
          ],
          editingIndex: null,
        };
      case TOGGLE_TEMPERATURE_UNIT:
        return {
          ...state,
          isCelsius: !state.isCelsius,
        };
      case TOGGLE_FAVOURITE:
        return {
          ...state,
          locations: state.locations.map((location, index) => {
            if (index === action.payload) {
              return {
                ...location,
                isFavourite: !location.isFavourite,
              };
            }
            return location;
          }),
        };
      default:
        return state;
    }
  };
  
  export default locationReducer;
  