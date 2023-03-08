import { useState, useEffect } from 'react';
import LocationList from '../components/LocationList';
import { connect } from 'react-redux';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { StyledContainer, StyledTypography, StyledButton } from '../MainStyles';
import { addLocation, toggleTemperatureUnit } from '../redux/actions/locationActions';
import { getLocationData, getLocationOptions } from '../services/LocationService';


export const HomePage = ({ locations, addLocation, toggleTemperatureUnit }) => {
  const [locationName, setLocationName] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const storedLocations = JSON.parse(localStorage.getItem('locations')) || [];
    storedLocations.forEach(location => addLocation(location));
  }, [addLocation]);

  const fetchOptions = async value => {
    const options = await getLocationOptions(value);
    setOptions(options.map(option => ({ name: option })));
  };

  const handleLocationChange = (event, value) => {
    if (value === null) {
      setLocationName('');
      return;
    }
    setLocationName(value.name);
  };

  const handleAddLocation = async event => {
    event.preventDefault();
    const locationData = await getLocationData(locationName);
    addLocation(locationData);
    const updatedLocations = locations ? [...locations, locationData] : [locationData];
    localStorage.setItem('locations', JSON.stringify(updatedLocations));
    setLocationName('');
  };

  return (
    <StyledContainer maxWidth="sm">
      <StyledTypography variant="h4" gutterBottom>
        Weather App
      </StyledTypography>
      <Autocomplete
        freeSolo
        options={options}
        getOptionLabel={option => option.name}
        onChange={handleLocationChange}
        onInputChange={(event, value) => fetchOptions(value)}
        renderInput={params => (
          <TextField {...params} label="Search for a location" variant="outlined" margin="normal" />
        )}
      />

      <form onSubmit={handleAddLocation}>
        <StyledButton type="submit" variant="contained" color="primary">
          Add Location
        </StyledButton>
      </form>

      <LocationList />
    </StyledContainer>
  );
};

const mapStateToProps = state => ({
  locations: state.locations,
  isCelsius: state.isCelsius,
});

const mapDispatchToProps = {
  addLocation,
  toggleTemperatureUnit,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
