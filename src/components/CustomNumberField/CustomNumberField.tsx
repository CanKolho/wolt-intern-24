import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { CustomNumberFieldProps } from '../../types';
import { validateInput } from '../../utils/validation';

const CustomNumberField = ({ testId, step, ...props }: CustomNumberFieldProps) => {
  const [error, setError] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>('');
  
  const checkInput = (value: string) => {
    const isValid = validateInput(value);
    setError(!isValid);
    setHelperText(isValid ? '' : 'Invalid number');
  }

  return (
    <TextField
      required 
      fullWidth 
      error={error}
      helperText={helperText}
      InputProps={{ 
        inputProps: {
          'data-test-id': testId,
          'data-testid': testId,
          min: 0,
          step: step || 1,
          pattern: "\\d*(\\.\\d+)?",
          onInput: (event: React.FocusEvent<HTMLInputElement>) => checkInput(event.target.value)
        }
      }}
      {...props}
    />
  );
}

export default CustomNumberField;