import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../redux/actions/weatherActions';
import { Helmet } from 'react-helmet';
import { getWeatherIcon } from '../utils/weatherIcon';
import { Grid, Typography, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { StyledTypography, StyledButton, StyledList } from '../MainStyles';

function ViewLocation({ location, onClose }) {
  const dispatch = useDispatch();
  const { isCelsius } = useSelector((state) => state.location);

  useEffect(() => {
    dispatch(fetchWeather(location.name));
  }, [location.name, dispatch]);

  return (
    <>
      <Helmet>
        <title>{location.name} | Weather App</title>
      </Helmet>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <StyledTypography variant="h4">{location.name}</StyledTypography>
        </Grid>
        <Grid item>
          {location.temperature && (
            <>
              <StyledTypography variant="h5">Current Weather</StyledTypography>
              <Grid container direction="row" alignItems="center" justifyContent="center" spacing={2}>
                <Grid item>{getWeatherIcon(location.conditionCode)}</Grid>
                <Grid item>
                  <Typography>
                    {isCelsius ? location.temperature : location.temperatureFahrenheit}
                    °{isCelsius ? 'C' : 'F'}
                  </Typography>
                </Grid>
              </Grid>

              <StyledTypography variant="subtitle1">Condition: {location.conditionText}</StyledTypography>
              <StyledTypography variant="subtitle1">Wind Speed: {location.windSpeed} kph</StyledTypography>
              <StyledTypography variant="subtitle1">Humidity: {location.humidity}%</StyledTypography>
            </>
          )}
          {location.forecast && (
            <>
              <StyledTypography variant="h5">Upcoming Weather</StyledTypography>
              <StyledList>
                {location.forecast.map((day) => (
                  <ListItem key={day.date}>
                    <ListItemIcon>{getWeatherIcon(day.day.condition.code)}</ListItemIcon>
                    <ListItemText
                      primary={day.date}
                      secondary={`Max Temp: ${
                        isCelsius ? day.day.maxtemp_c : day.day.maxtemp_f
                      }°${isCelsius ? 'C' : 'F'} Min Temp: ${
                        isCelsius ? day.day.mintemp_c : day.day.mintemp_f
                      }°${isCelsius ? 'C' : 'F'} Condition: ${day.day.condition.text}`}
                    />
                  </ListItem>
                ))}
              </StyledList>
            </>
          )}
        </Grid>
        <Grid item>
          <StyledButton  onClick={onClose} startIcon={<Close />}>
            Close
          </StyledButton>
        </Grid>
      </Grid>
    </>
  );
}

ViewLocation.propTypes = {
  location: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ViewLocation;
