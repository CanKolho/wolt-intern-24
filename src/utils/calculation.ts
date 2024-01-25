import { Dayjs } from 'dayjs';
import { ValidatedInputs } from '../types';

const calculateSmallOrderFee = (cartValue: number): number => {
  console.log(`cart charge: ${cartValue < 10 ? 10 - cartValue : 0}€`)
  return cartValue < 10 ? 10 - cartValue : 0; 
};

const calculateDistanceFee = (distance: number): number => {
  if (distance < 1000) return 1;

  //First 1000 meters (=1km) is 2€
  const base = 2;
  const remainingDistance = distance - 1000;

  // Tells how many euros gets added to base (2€)
  const additionalCharge = Math.ceil(remainingDistance / 500);

  console.log(`distance charge: ${base+additionalCharge}€`)

  return base + additionalCharge;
}

const calculateItemsFee = (items: number): number => {
  if (items < 5) return 0;

  // Items to be charged by 0,5€ including the 5th item
  const itemsToCharge = (items - 4) * 0.5;

  // An extra "bulk" fee applies for more than 12 items of 1,20€
  const bulkFee = items > 12 ? 1.2 : 0;

  console.log(`items charge: ${itemsToCharge+bulkFee}`)
  return itemsToCharge + bulkFee;
}

const calculateRushHourMultiplier = (deliveryFee: number, date: Dayjs): number => {
  const isFriday = date.day() === 5;
  const isRushHour = date.hour() >= 15 && date.hour() < 19;

  // 20% extra on fridays between 15-19
  return isFriday && isRushHour 
    ? deliveryFee * 1.2 
    : deliveryFee 
}

export const calculateDeliveryFee = (validatedInputs: ValidatedInputs): number => {
  if (validatedInputs.cartValue >= 200) return 0;

  let deliveryFee = calculateSmallOrderFee(validatedInputs.cartValue);
  deliveryFee += calculateDistanceFee(validatedInputs.distance);
  deliveryFee += calculateItemsFee(validatedInputs.items);
  
  deliveryFee = calculateRushHourMultiplier(deliveryFee, validatedInputs.date);

  return Math.min(deliveryFee, 15);
}
