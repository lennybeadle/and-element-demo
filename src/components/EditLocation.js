import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux';
import { updateLocation } from '../redux/actions/locationActions';
import { getLocationData, getLocationOptions } from '../services/LocationService';

function EditLocation({ location, onCancel, updateLocation }) {
  const [selectedLocation, setSelectedLocation] = useState(location);
  const [locationOptions, setLocationOptions] = useState([]);

  useEffect(() => {
    const fetchLocationOptions = async () => {
      const options = await getLocationOptions(selectedLocation.name);
      setLocationOptions(options);
    }
    fetchLocationOptions();
  }, [selectedLocation.name]);

  const handleLocationChange = (event, value) => {
    setSelectedLocation({
      ...selectedLocation,
      name: value || '',
    });
  };

  const handleSaveClick = async () => {
    try {
      const weatherData = await getLocationData(selectedLocation.name);
      if (weatherData) {
        const temperature = location.isCelsius ? weatherData.temperature : weatherData.temperatureFahrenheit;
        const temperatureFahrenheit = location.isCelsius ? weatherData.temperatureFahrenheit :  weatherData.temperature;
        const newLocation = {
          name: weatherData.name,
          temperature,
          temperatureFahrenheit,
          isFavourite: weatherData.isFavourite,
          forecast: weatherData.forecast,
          isCelsius: location.isCelsius,
          humidity: weatherData.humidity,
          windSpeed: weatherData.wind_kph,
          condition: weatherData.conditionText,
        };
        console.log('updating:', newLocation, 'index:', selectedLocation.index);
        updateLocation(newLocation, selectedLocation.index);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleCancelClick = () => onCancel();

  return (
    <form>
      <Autocomplete
        options={locationOptions}
        freeSolo
        value={selectedLocation.name}
        onInputChange={handleLocationChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for a location"
            variant="outlined"
            margin="normal"
          />
        )}
      />
      <Button onClick={handleSaveClick}>Save</Button>
      <Button onClick={handleCancelClick}>Cancel</Button>
    </form>
  );
}

EditLocation.propTypes = {
  location: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  updateLocation: PropTypes.func.isRequired,
};

export default connect(null, { updateLocation })(EditLocation);
