import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CustomDatePickerProps } from '../types';
import dayjs from 'dayjs';

const CustomDatepicker = ({ date, setDate }: CustomDatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker 
        label="Delivery Date" 
        aria-label="Delivery date" 
        data-test-id="deliveryDate"
        slotProps={{ textField: { fullWidth: true } }} 
        format='DD/MM/YYYY'

        value={date} 
        onChange={ (newDate) => setDate(newDate || dayjs()) }/>
    </LocalizationProvider>
  );
}

export default CustomDatepicker;