import { ValidatedInputs, NonValidatedInputs } from '../types';
import dayjs from 'dayjs';

const validateDecimalPoint = (input: string): boolean => {
  // Regex to validate a number with a decimal point with up to 2 decimals (e.g. 1.23)
  const regex = /^\d+(\.\d{1,2})?$/;
  return regex.test(input);
}

const validatePositiveNum = (input: string): boolean => {
  const regex = /^\d+$/;
  return regex.test(input);
}

const validateDate = (input: string): boolean => {
  // Regex to validate a date in the format DD-MM-YYYY
  const regex = /^\d{2}-\d{2}-\d{4}/;
  return regex.test(input);
}

export const validateInputs = ({ cartValue, distance, items, date }: NonValidatedInputs): ValidatedInputs => {
  if (!validateDecimalPoint(cartValue)) {
    throw new Error('Cart value must be a number with a decimal point.');
  }

  if (!validatePositiveNum(distance)) {
    throw new Error('Distance must be a positive number.');
  }

  if (!validatePositiveNum(items)) {
    throw new Error('Items must be a positive number.');
  }

  if (!validateDate(date)) {
    throw new Error('Date must be in the format DD-MM-YYYY.');
  }

  const validatedInputs = {
    cartValue: Number(cartValue),
    distance: Number(distance),
    items: Number(items),
    date: dayjs(date, 'DD-MM-YYYY HH:mm:ss')
  }

  return validatedInputs
}
