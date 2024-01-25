import Typography from '@mui/material/Typography';
import { deliveryFeeProps } from '../types';

const DeliveryFee = (props: deliveryFeeProps) => {
  if (!props.deliveryFee) return null;
  
  return (
    <Typography component="h2" variant="h6" data-test-id='fee'>
      Delivery Fee: {props.deliveryFee} €
    </Typography>
  )
}

export default DeliveryFee;