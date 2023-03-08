import styled from 'styled-components';
import { Container, Typography, Button, TextField } from '@mui/material';


export const StyledContainer = styled(Container)`
  margin-top: 20px;
`;

export const StyledTypography = styled(Typography)`
  text-align: center;
`;

export const StyledAutocomplete = styled(TextField)`
  && {
    width: 100%;
  }
`;

export const StyledButton = styled(Button)`
  margin-top: 10px;
`;

export const StyledTemperatureButton = styled(Button)`
  margin-left: 10px;
`;

export const StyledListItemText = styled.div`
  margin-right: 24px;
`;

export const StyledList = styled.div`
  margin-top: 20px;
`;

export const StyledFormContainer = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 100px;
  grid-gap: 20px;
  margin-top: 20px;
  align-items: center;
`;

export const StyledAddLocationButton = styled(Button)`
  grid-column-start: 2;
  justify-self: end;
`;

export const StyledAutocompleteContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 100px;
  grid-gap: 20px;
  align-items: center;
`;

export const StyledLocationListContainer = styled.div`
  margin-top: 20px;
`;

export const StyledTemperatureSwitchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
`;

export const StyledTemperatureSwitchLabel = styled(Typography)`
  margin-right: 10px;
`;
