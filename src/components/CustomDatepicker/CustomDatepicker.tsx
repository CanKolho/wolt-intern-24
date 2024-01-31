import { useState, useEffect } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { CustomDatePickerProps } from '../../types'
import { DateValidationError } from '@mui/x-date-pickers/models'
import dayjs, { Dayjs } from 'dayjs'

const CustomDatepicker = ({ date, setDate, setIsDateValid }: CustomDatePickerProps) => {
  const [error, setError] = useState<DateValidationError | null>(null)
  const [helperText, setHelperText] = useState<string>('')

  // handles the side effect of the error state - this is used to disable/enable the calculate button in the form
  useEffect(() => {
    switch (error) {
    case 'invalidDate':
    case 'disablePast':
      setIsDateValid(false)
      setHelperText('Please select your date from today onwards')
      break
    default:
      setIsDateValid(true)
      setHelperText('')
      break
    }
  }, [error, setIsDateValid])

  const handleDateChange = (newDate: Dayjs | null) => setDate(newDate || dayjs())

  const handleErrorChange = (newError: DateValidationError | null) => setError(newError)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Order Date"
        aria-label="Order date"
        format="DD/MM/YYYY"
        onError={handleErrorChange}
        slotProps={{
          textField: {
            fullWidth: true,
            helperText: helperText,
            inputProps: { 'data-test-id': 'orderTime', 'data-testid': 'orderTime' }
          }
        }}
        disablePast
        value={date}
        onChange={handleDateChange}
      />
    </LocalizationProvider>
  )
}

export default CustomDatepicker