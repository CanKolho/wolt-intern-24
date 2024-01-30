import { Dayjs } from 'dayjs';
import { ValidatedInputs } from '../../types';

export const calculateSmallOrderFee = (cartValue: number): number => {
  if (cartValue < 0) throw new Error('Cart value cannot be negative');

  const smallOrderFee = 10;
  const difference = Math.round((smallOrderFee - cartValue)*100)/100;
  
  return cartValue < smallOrderFee ? difference : 0; 
};

export const calculateDistanceFee = (distance: number): number => {
  if (distance < 0) throw new Error('Distance cannot be negative');

  if (distance < 1000) return 1;

  const base = 2;
  const remainingDistance = distance - 1000;
  const additionalCharge = Math.ceil(remainingDistance / 500);
  return base + additionalCharge;
}

export const calculateItemsFee = (items: number): number => {
  if (items < 0) throw new Error('Number of items cannot be negative');

  if (items < 5) return 0;

  const perItemCharge = 0.5;
  const additionalBulkFee = 1.2;
  const itemSurCharge = (items - 4) * perItemCharge;
  const bulkFee = items > 12 ? additionalBulkFee : 0;
  return itemSurCharge + bulkFee;
}

export const applyRushHourMultiplier = (deliveryFee: number, date: Dayjs): number => {
  if (deliveryFee < 0) throw new Error('Delivery Fee cannot be negative');

  const isFriday = date.day() === 5;
  const isRushHour = date.hour() >= 15 && date.hour() < 19;
  const rushHourMultiplier = 1.2;

  return isFriday && isRushHour 
    ? deliveryFee * rushHourMultiplier
    : deliveryFee 
}

export const calculateDeliveryFee = ({ cartValue, distance, items, date }: ValidatedInputs): number => {
  if (cartValue >= 200) return 0;

  let deliveryFee = calculateSmallOrderFee(cartValue);
  deliveryFee += calculateDistanceFee(distance);
  deliveryFee += calculateItemsFee(items);
  deliveryFee = applyRushHourMultiplier(deliveryFee, date);
  
  return Math.min(deliveryFee, 15);
}
