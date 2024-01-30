import { useState } from 'react';
import { useField } from '../../hooks/useField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import DeliveryFee from '../DeliveryFee/DeliveryFee';
import Notification from '../Notification/Notification';
import CustomTextField from '../CustomTextField/CustomTextField';
import CustomDatepicker from '../CustomDatepicker/CustomDatepicker';
import { ValidatedInputs, NonValidatedInputs } from '../../types';
import dayjs, { Dayjs } from 'dayjs';
import { calculateDeliveryFee } from '../../utils/calculation/calculation';
import { validateInputs } from '../../utils/validation';
import formStyles from './formStyles';

const DeliveryFeeForm = () => {
  // Custom hook for the text fields - reset is destructured from the returned object
  const { reset: resetCartValue, ...cartValue } = useField('number');
  const { reset: resetDistance, ...distance } = useField('number');
  const { reset: resetItems, ...items }= useField('number');
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [deliveryFee, setDeliveryFee] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nonValidatedInputs: NonValidatedInputs = {
      cartValue: cartValue.value,
      distance: distance.value,
      items: items.value,
      date: date.format('DD-MM-YYYY HH:mm:ss')
    }

    try {
      const validatedInputs: ValidatedInputs = validateInputs(nonValidatedInputs);
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
      <Box sx={formStyles.box}>
        <Typography component="h1" variant="h5">Delivery Fee Calculator</Typography>
        <Notification message={errorMessage} />
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            {/* Textfield components */}
            <Grid item xs={6}><CustomTextField {...cartValue} label='Cart Value (€)' testId='cartValue' /></Grid>
            <Grid item xs={6}><CustomTextField {...distance} label="Distance (m)" testId='deliveryDistance' /></Grid>
            <Grid item xs={12}><CustomTextField {...items} label="Amount of items (count)" testId='numberOfItems'/></Grid>
            {/* DatePicker component */}
            <Grid item xs={12}><CustomDatepicker date={date} setDate={setDate} /></Grid>
            {/* Button components */}
            <Grid item xs={9}><Button fullWidth variant="contained" color="primary" data-testid="calculate-button" data-test-id="calculate-button" sx={formStyles.submitButton} type="submit">Calculate</Button></Grid>
            <Grid item xs={3}><Button fullWidth variant="outlined" color="error" data-testid="reset-button" data-test-id="reset-button" onClick={handleReset}>Reset</Button></Grid>
          </Grid>
        </Box>
        <DeliveryFee deliveryFee={deliveryFee} />
      </Box>
    </Container>
  );
}

export default DeliveryFeeForm;