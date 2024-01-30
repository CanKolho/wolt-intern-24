import { Dayjs } from 'dayjs';

export interface UseFieldReturn {
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
}

export interface deliveryFeeProps {
  deliveryFee: string
}

export interface ValidatedInputs {
  cartValue: number,
  distance: number,
  items: number,
  date: Dayjs,
}

export interface CustomDatePickerProps {
  date: Dayjs,
  setDate: React.Dispatch<React.SetStateAction<Dayjs>>,
  setIsDateValid: React.Dispatch<React.SetStateAction<boolean>>
}

export interface CustomNumberFieldProps {
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string,
  testId: string,
  step?: number
}
