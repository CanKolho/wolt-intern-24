import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import DeliveryFee from './DeliveryFee'

describe('DeliveryFee', () => {
  it('renders correctly', () => {
    render(<DeliveryFee deliveryFee={'2.50'} />)
    const element = screen.getByTestId('fee')
    expect(element).toBeInTheDocument()
    expect(element).toHaveTextContent('Delivery Fee: 2.50 €')
  })

  it('renders nothing if no deliveryFee is provided', () => {
    render(<DeliveryFee deliveryFee={''} />)
    expect(screen.queryByTestId('fee')).not.toBeInTheDocument()
  })
})