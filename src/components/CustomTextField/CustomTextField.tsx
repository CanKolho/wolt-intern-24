import TextField from '@mui/material/TextField';
import { CustomTextFieldProps } from '../../types';

const CustomTextField = ({ testId, ...props }: CustomTextFieldProps) => {
  return (
    <TextField
      required 
      fullWidth
      InputProps={{ 
        inputProps: {
          'data-test-id': testId,
          'data-testid': testId,
          min: 0,
        }
      }}
      {...props}
    />
  );
}

export default CustomTextField;