import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import DeliveryFeeForm from './DeliveryFeeForm';

describe('DeliveryFeeForm', () => {
  let user: UserEvent;
  let header: HTMLElement;
  let cartvalueinput: HTMLElement;
  let distanceinput: HTMLElement;
  let itemsinput: HTMLElement;
  let dateinput: HTMLElement;
  let submitbutton: HTMLElement;
  let resetbutton: HTMLElement;

  beforeEach(() => {
    user = userEvent.setup()
    render(<DeliveryFeeForm />)
    header = screen.getByText(/Delivery Fee Calculator/i)
    cartvalueinput = screen.getByTestId('cartValue')
    distanceinput = screen.getByTestId('deliveryDistance')
    itemsinput = screen.getByTestId('numberOfItems')
    dateinput = screen.getByTestId('orderTime')
    submitbutton = screen.getByRole('button', { name: /calculate/i })
    resetbutton = screen.getByRole('button', { name: /reset/i })
  })

  it('renders correctly the form elements', () => {    
    expect(header).toBeInTheDocument()
    expect(cartvalueinput).toBeInTheDocument()
    expect(distanceinput).toBeInTheDocument()
    expect(itemsinput).toBeInTheDocument()
    expect(dateinput).toBeInTheDocument()
    expect(submitbutton).toBeInTheDocument()
    expect(resetbutton).toBeInTheDocument()
  })

  it('renders the error notification where inputs are invalid', async () => {    
    await user.type(cartvalueinput, 'invalid input')
    await user.click(submitbutton)

    const notification = screen.getByTestId('notification')
    expect(notification).toBeInTheDocument()
    expect(notification).toHaveTextContent(/Cart value must be a positive number with a decimal point./i)
  })

  it('renders the calculated delivery fee', async () => {        
    await user.type(cartvalueinput, '3')
    await user.type(distanceinput, '1000')
    await user.type(itemsinput, '10')
    await user.type(dateinput, '29/01/2024')
    await user.click(submitbutton)

    const deliveryfee = screen.getByTestId('fee')
    expect(deliveryfee).toBeInTheDocument()
    expect(deliveryfee).toHaveTextContent(/Delivery fee: 12.00 €/i)
  })
})