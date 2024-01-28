import { calculateSmallOrderFee, calculateDistanceFee, calculateItemsFee, applyRushHourMultiplier, calculateDeliveryFee } from './calculation';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ValidatedInputs } from '../../types';
// This is required to parse the date string in the format DD-MM-YYYY HH:mm
dayjs.extend(customParseFormat);

describe('calculateSmallOrderFee', () => {
  it('should return 0 if cart value is greater than or equal to small order fee', () => {
    const cartValue = 15;
    const result = calculateSmallOrderFee(cartValue);
    expect(result).toBe(0);
  });

  it('should return the difference if cart value is less than small order fee', () => {
    const cartValue = 5;
    const result = calculateSmallOrderFee(cartValue);
    expect(result).toBe(5);
  });
});

describe('calculateDistanceFee', () => {
  it('should return 1€ when delivery distance is less than 1000m', () => {
    const distance = 500
    const result = calculateDistanceFee(distance)
    expect(result).toBe(1)
  })

  it('should return 2€ when delivery distance is equal to 1000m', () => {
    const distance = 1000
    const result = calculateDistanceFee(distance)
    expect(result).toBe(2)
  });

  it('should return the correct fee when delivery distance is greater than 1000m', () => {
    let distance = 1500;
    let result = calculateDistanceFee(distance);
    expect(result).toBe(3);

    distance = 1650;
    result = calculateDistanceFee(distance);
    expect(result).toBe(4);
  });
})

describe('calculateItemsFee', () => {
  it('should return 0 if items is less than 5', () => {
    const items = 4;
    const result = calculateItemsFee(items);
    expect(result).toBe(0);
  });

  it('should return the correct fee if items is greater than 5', () => {
    const items = 8;
    const result = calculateItemsFee(items);
    expect(result).toBe(2);
  });

  it('should return the correct fee if items is greater than 12', () => {
    const items = 15;
    const result = calculateItemsFee(items);
    expect(result).toBe(6.7);
  });
});

describe('applyRushHourMultiplier', () => {
  it('should return the delivery fee multiplied if it is Friday and rush hour', () => {
    const deliveryFee = 10;
    const date = dayjs('26-01-2024 16:00', 'DD-MM-YYYY HH:mm');
    const result = applyRushHourMultiplier(deliveryFee, date);
    expect(result).toBe(12);
  });

  it('should return the delivery fee if it is not Friday or not rush hour', () => {
    const deliveryFee = 10;

    // Not Friday
    let date = dayjs('27-01-2024 14:00', 'DD-MM-YYYY HH:mm');
    const result = applyRushHourMultiplier(deliveryFee, date);
    expect(result).toBe(10);

    // Friday but not rush hour
    dayjs('26-01-2024 14:00:00', 'DD-MM-YYYY HH:mm');
    const result2 = applyRushHourMultiplier(deliveryFee, date);
    expect(result2).toBe(10);
  });
});

describe('calculateDeliveryFee', () => {
  it('should return 0 if cart value is greater than or equal to 200', () => {
    const inputs: ValidatedInputs = {
      cartValue: 250,
      distance: 1000,
      items: 5,
      date: dayjs('26-01-2024 12:00', 'DD-MM-YYYY HH:mm')
    };
    const result = calculateDeliveryFee(inputs);
    expect(result).toBe(0);
  });

  it('should calculate the delivery fee correctly', () => {
    const inputs: ValidatedInputs = {
      cartValue: 150,
      distance: 1500,
      items: 10,
      date: dayjs('27-01-2024 18:00', 'DD-MM-YYYY HH:mm')
    };
    const result = calculateDeliveryFee(inputs);
    expect(result).toBe(6);
  });

  it('should calculate the delivery fee with rush hour multiplier', () => {
    const inputs: ValidatedInputs = {
      cartValue: 100,
      distance: 2000,
      items: 3,
      date: dayjs('26-01-2024 16:30', 'DD-MM-YYYY HH:mm')
    };
    const result = calculateDeliveryFee(inputs);
    expect(result).toBe(4.8);
  });
});