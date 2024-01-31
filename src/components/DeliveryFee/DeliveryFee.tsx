import Typography from '@mui/material/Typography'
import { deliveryFeeProps } from '../../types'

const DeliveryFee = ({ deliveryFee }: deliveryFeeProps) => {
  if (!deliveryFee) return null

  return (
    <Typography component="h2" variant="h6" data-testid='fee' data-test-id='fee'>
      Delivery Fee: {deliveryFee} €
    </Typography>
  )
}

export default DeliveryFee