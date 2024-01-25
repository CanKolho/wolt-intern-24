import { useState } from 'react';
import { useField } from '../../hooks/useField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import DeliveryFee from '../DeliveryFee';
import Notification from '../Notification';
import CustomDatepicker from '../CustomDatepicker';
import { ValidatedInputs } from '../../types';
import dayjs, { Dayjs } from 'dayjs';
import { calculateDeliveryFee } from '../../utils/calculation';
import { validateInputs } from '../../utils/validation';
import formStyles from './formStyles';

const DeliveryFeeForm = () => {
  // Custom hook for the text fields - reset is destructured from the returned object
  const { reset: resetCartValue, ...cartValue } = useField('text');
  const { reset: resetDistance, ...distance } = useField('text');
  const { reset: resetItems, ...items }= useField('text');

  const [date, setDate] = useState<Dayjs>(dayjs());
  const [deliveryFee, setDeliveryFee] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const validatedInputs: ValidatedInputs = validateInputs(cartValue.value, distance.value, items.value, date.format('DD-MM-YYYY HH:mm:ss'));
      const calculatedFee: number = calculateDeliveryFee(validatedInputs);
      setDeliveryFee(calculatedFee.toFixed(2));

    } catch (error: unknown) {
      let errorMessage = '';
      if (error instanceof Error) {
        errorMessage += error.message;
      }
      setErrorMessage(errorMessage);
      setTimeout(() => setErrorMessage(''), 5000);
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
            <Grid item xs={6}><TextField required fullWidth {...cartValue} id="cartValue" data-test-id="cartValue" label="Cart Value (€)" name="cartValue" /></Grid>
            <Grid item xs={6}><TextField required fullWidth {...distance} id="distance" data-test-id="distance" label="Distance (m)" name="distance" /></Grid>
            <Grid item xs={12}><TextField required fullWidth {...items} id="items" data-test-id="items" label="Amount of items (count)" name="items" /></Grid>
            {/* DatePicker component */}
            <Grid item xs={12}><CustomDatepicker date={date} setDate={setDate} /></Grid>
            {/* Button components */}
            <Grid item xs={3}><Button fullWidth variant="outlined" color="error" data-test-id="reset-button" onClick={handleReset}>Reset</Button></Grid>
            <Grid item xs={9}><Button fullWidth variant="contained" color="primary" data-test-id="calculate-button" sx={formStyles.submitButton} type="submit">Calculate</Button></Grid>
          </Grid>
        </Box>
        {deliveryFee && <DeliveryFee deliveryFee={deliveryFee} />}
      </Box>
    </Container>
  );
}

export default DeliveryFeeForm;