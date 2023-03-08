import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
} from '@mui/material';
import {
  FavoriteBorder,
  Favorite,
  Edit,
  Delete,
  Visibility,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteLocation,
  toggleTemperatureUnit,
  toggleFavourite,
} from '../redux/actions/locationActions';
import ViewLocation from './ViewLocation';
import EditLocation from './EditLocation';
import { fetchWeather } from '../redux/actions/weatherActions';

function LocationList() {
  const dispatch = useDispatch();

  const { locations, isCelsius } = useSelector((state) => state.location);
  const weatherData = useSelector((state) => state.weather.weatherData);

  const [selectedViewLocation, setSelectedViewLocation] = useState(null);
  const [selectedEditLocation, setSelectedEditLocation] = useState(null);

  const handleView = async (location) => {
    await dispatch(fetchWeather(location.name, isCelsius));
    setSelectedViewLocation(location);
  };

  const handleViewClose = () => setSelectedViewLocation(null);

  const handleDelete = (index) => dispatch(deleteLocation(index));

  const handleTemperatureToggle = () => {
    dispatch(toggleTemperatureUnit());
    locations.forEach((location) => {
      dispatch(fetchWeather(location.name, !isCelsius));
    });
  };

  const handleEdit = (index) => {
    const location = locations[index];
    setSelectedEditLocation({ ...location, index });
    console.log('editing at:', index);
  };

  const handleFavouriteToggle = (index) => dispatch(toggleFavourite(index));

  const handleCancelClick = () => setSelectedEditLocation(null);

  useEffect(() => {
    setSelectedViewLocation(null);
    setSelectedEditLocation(null);
  }, [locations]);

  return (
    <>
      {selectedViewLocation && (
        <ViewLocation
          location={selectedViewLocation}
          weatherData={weatherData}
          onClose={handleViewClose}
        />
      )}
      {selectedEditLocation && (
        <EditLocation
          location={selectedEditLocation}
          onCancel={handleCancelClick}
        />
      )}
      <Button variant="outlined" onClick={handleTemperatureToggle}>
        {isCelsius ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
      </Button>
      <List>
        {locations.sort((a, b) => (b.isFavourite - a.isFavourite)).map((location, index) => (
          <ListItem key={location.id}>
            <ListItemIcon>
              <IconButton edge="start" onClick={() => handleFavouriteToggle(index)}>
                {location.isFavourite ? (
                  <Favorite color="secondary" />
                ) : (
                  <FavoriteBorder />
                )}
              </IconButton>
            </ListItemIcon>
            <ListItemText
              primary={location.name}
              secondary={`${location[`temperature${isCelsius ? '' : 'Fahrenheit'}`]} ${
                isCelsius ? '°C' : '°F'
              }`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleView(location)}>
                <Visibility />
              </IconButton>
              <IconButton edge="end" onClick={() => handleEdit(index)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDelete(index)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default LocationList;
