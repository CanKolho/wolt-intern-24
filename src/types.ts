export interface UseFieldReturn {
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
}

export interface deliveryFeeProps {
  deliveryFee: string
}