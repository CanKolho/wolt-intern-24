// Validate a number input with a decimal point
export const validateInput = (input: string): boolean => {
    const regexPattern = /^\d+(\.\d+)?$/;
   return regexPattern.test(input);
}
  
