export const validateDateInput = (input: string): boolean => {
  // Regex to validate a date in the format DD-MM-YYYY
  const regex = /^\d{2}-\d{2}-\d{4}$/;
  return regex.test(input);
}

// Validate a number input with a decimal point
export const validateInput = (input: string): boolean => {
    const regexPattern = /^\d+(\.\d+)?$/;
   return regexPattern.test(input);
}
  
