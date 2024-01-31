import { useState, useEffect } from 'react'
import { useField } from '../../hooks/useField'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DeliveryFee from '../DeliveryFee/DeliveryFee'
import CustomNumberField from '../CustomNumberField/CustomNumberField'
import CustomButton from '../CustomButton/CustomButton'
import CustomDatepicker from '../CustomDatepicker/CustomDatepicker'
import { ValidatedInputs } from '../../types'
import dayjs, { Dayjs } from 'dayjs'
import { calculateDeliveryFee } from '../../utils/calculation/calculation'
import { validateInput } from '../../utils/validation'

const DeliveryFeeForm = () => {
  // Custom hook for the text fields - reset is destructured from the returned object
  const { reset: resetCartValue, ...cartValue } = useField('number')
  const { reset: resetDistance, ...distance } = useField('number')
  const { reset: resetItems, ...items }= useField('number')
  const [date, setDate] = useState<Dayjs>(dayjs())
  const [deliveryFee, setDeliveryFee] = useState<string>('')
  const [isFormValid, setIsFormValid] = useState<boolean>(false)
  const [isDateValid, setIsDateValid] = useState<boolean>(true)

  // Checks if the form is valid on every change of the inputs
  // By defining the function inside the useEffect, we ensure that it captures the latest values of its dependencies each time they change.
  useEffect(() => {
    const checkFormValidity = () => {
      const isCartValueValid = validateInput(cartValue.value)
      const isDistanceValid = validateInput(distance.value)
      const isItemsValid = validateInput(items.value)

      const isValid = isCartValueValid && isDistanceValid && isItemsValid && isDateValid
      setIsFormValid(isValid)
    }

    checkFormValidity()
  }, [cartValue.value, distance.value, items.value, isDateValid])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Inputs are validated by the customNumberField component and the form is enabled only if all inputs are valid
    const validatedInputs: ValidatedInputs = {
      cartValue: parseFloat(cartValue.value),
      distance: parseInt(distance.value),
      items: parseInt(items.value),
      date: date
    }

    try {
      const calculatedFee: number = calculateDeliveryFee(validatedInputs)
      setDeliveryFee(calculatedFee.toFixed(2))
    } catch (error: unknown) {
      let errorMessage = ''
      if (error instanceof Error) {
        errorMessage += error.message
      }
      alert(errorMessage)
    }
  }

  const handleReset = () => {
    resetCartValue()
    resetDistance()
    resetItems()
    setDate(dayjs())
    setDeliveryFee('')
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8, gap: 2 }}>
        <Typography component="h1" variant="h5">Delivery Fee Calculator</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Numberfield components */}
            <Grid item xs={6}><CustomNumberField {...cartValue} step={0.01} label='Cart Value (€)' testId='cartValue' /></Grid>
            <Grid item xs={6}><CustomNumberField {...distance} min={1} label="Distance (m)" testId='deliveryDistance' /></Grid>
            <Grid item xs={12}><CustomNumberField {...items} min={1} label="Number of items" testId='numberOfItems'/></Grid>
            {/* DatePicker component */}
            <Grid item xs={12}><CustomDatepicker date={date} setDate={setDate} setIsDateValid={setIsDateValid} /></Grid>
            {/* Button components */}
            <Grid item xs={9}><CustomButton type='submit' label='Calculate' testId='calculateButton' disabled={!isFormValid} /></Grid>
            <Grid item xs={3}><CustomButton label='Reset' testId='resetButton' variant='outlined' color='error' handleClick={handleReset} /></Grid>
          </Grid>
        </Box>
        <DeliveryFee deliveryFee={deliveryFee} />
      </Box>
    </Container>
  )
}

export default DeliveryFeeForm