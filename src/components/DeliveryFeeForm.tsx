import { useState } from 'react';
import { useField } from '../hooks/useField';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeliveryFee from './DeliveryFee';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';

import { calculateDeliveryFee } from '../utils';

const DeliveryFeeForm = () => {

  // Custom hook for the text fields - reset is destructured from the returned object
  const { reset: resetCartValue, ...cartValue } = useField('text');
  const { reset: resetDistance, ...distance } = useField('text');
  const { reset: resetItems, ...items }= useField('text');

  // useState hook for the date picker (using dayjs) - default value is today
  const [date, setDate] = useState<Dayjs>(dayjs());

  // useState hook for the delivery fee
  const [deliveryFee, setDeliveryFee] = useState('');


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const calculatedFee: number = calculateDeliveryFee(Number(cartValue.value), Number(distance.value), Number(items.value), date);

      // Setting the delivery fee to 2 decimal places (e.g. 2.00)
      setDeliveryFee(calculatedFee.toFixed(2));

    } catch (error) {
      console.log(error);
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
      
      <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
          gap: 2
        }}>

        <Typography component="h1" variant="h5">
          Delivery Fee Calculator
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>

          <Grid container spacing={2}>

            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                {...cartValue}
                id="cartValue"
                data-test-id="cartValue"
                label="Cart Value (€)"
                name="cartValue"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                {...distance}
                id="distance"
                data-test-id="distance"
                label="Distance (m)"
                name="distance"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                {...items}
                id="items"
                data-test-id="items"
                label="Amount of items (count)"
                name="items"
              />
            </Grid>

            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Delivery Date"
                  slotProps={{ textField: { fullWidth: true } }}
                  format='DD/MM/YYYY'
                  value={date}
                  onChange={ (newDate) => setDate(newDate || dayjs()) }
                  data-test-id="deliveryDate"
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={3}>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                data-test-id="reset-button"
                onClick={handleReset}
              >
                Reset
              </Button>
            </Grid>

            <Grid item xs={9}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                data-test-id="calculate-button"
                type="submit"
                
                sx={{
                  backgroundColor: 'rgb(0, 157, 224)',
                  transition: '0.3s',
                  '&:hover': {
                    backgroundColor: 'rgb(0, 157, 224)',
                    opacity: 0.8,
                  },
                }}
              >
                Calculate
              </Button>
              
            </Grid>

          </Grid>

        </Box>

        { deliveryFee && <DeliveryFee deliveryFee={deliveryFee} /> }
        
      </Box>

    </Container>
  );
}

export default DeliveryFeeForm;