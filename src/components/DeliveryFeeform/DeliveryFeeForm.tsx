import { useState, useEffect } from 'react';
import { useField } from '../../hooks/useField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import DeliveryFee from '../DeliveryFee/DeliveryFee';
import Notification from '../Notification/Notification';
import CustomNumberField from '../CustomNumberField/CustomNumberField';
import CustomDatepicker from '../CustomDatepicker/CustomDatepicker';
import { ValidatedInputs } from '../../types';
import dayjs, { Dayjs } from 'dayjs';
import { calculateDeliveryFee } from '../../utils/calculation/calculation';
import { validateInput } from '../../utils/validation';

const DeliveryFeeForm = () => {
  // Custom hook for the text fields - reset is destructured from the returned object
  const { reset: resetCartValue, ...cartValue } = useField('number');
  const { reset: resetDistance, ...distance } = useField('number');
  const { reset: resetItems, ...items }= useField('number');
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [deliveryFee, setDeliveryFee] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const checkFormValidity = () => {
    const isValid = validateInput(cartValue.value) && validateInput(distance.value) && validateInput(items.value);
    setIsFormValid(isValid);
  }

  useEffect(() => {
    checkFormValidity();
  }, [cartValue.value, distance.value, items.value]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Inputs are validated by the custom number field component and the form is enabled only if all inputs are valid
    const validatedInputs: ValidatedInputs = {
      cartValue: parseFloat(cartValue.value),
      distance: parseInt(distance.value),
      items: parseInt(items.value),
      date: date
    }

    try {
      const calculatedFee: number = calculateDeliveryFee(validatedInputs);
      setDeliveryFee(calculatedFee.toFixed(2));
    } catch (error: unknown) {
      let errorMessage = '';
      if (error instanceof Error) {
        errorMessage += error.message;
      }
      setErrorMessage(errorMessage);
      setTimeout(() => setErrorMessage(''), 6000);
    }
  }

  const handleReset = () => {
    resetCartValue();
    resetDistance();
    resetItems();
    setDate(dayjs());
    setDeliveryFee('');
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8, gap: 2 }}>
        <Typography component="h1" variant="h5">Delivery Fee Calculator</Typography>
        <Notification message={errorMessage} />
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Numberfield components */}
            <Grid item xs={6}><CustomNumberField {...cartValue} step={0.01} label='Cart Value (€)' testId='cartValue' /></Grid>
            <Grid item xs={6}><CustomNumberField {...distance} step={10} label="Distance (m)" testId='deliveryDistance' /></Grid>
            <Grid item xs={12}><CustomNumberField {...items} label="Number of items" testId='numberOfItems'/></Grid>
            {/* DatePicker component */}
            <Grid item xs={12}><CustomDatepicker date={date} setDate={setDate} /></Grid>
            {/* Button components */}
            <Grid item xs={9}><Button disabled={!isFormValid} fullWidth variant="contained" color="primary" data-testid="calculate-button" data-test-id="calculate-button" type="submit">Calculate</Button></Grid>
            <Grid item xs={3}><Button fullWidth variant="outlined" color="error" data-testid="reset-button" data-test-id="reset-button" onClick={handleReset}>Reset</Button></Grid>
          </Grid>
        </Box>
        <DeliveryFee deliveryFee={deliveryFee} />
      </Box>
    </Container>
  );
}

export default DeliveryFeeForm;