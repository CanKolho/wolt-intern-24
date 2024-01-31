import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import DeliveryFeeForm from './DeliveryFeeForm'

describe('DeliveryFeeForm', () => {
  let user: UserEvent
  let header: HTMLElement
  let cartvalueinput: HTMLElement
  let distanceinput: HTMLElement
  let itemsinput: HTMLElement
  let dateinput: HTMLElement
  let submitbutton: HTMLElement
  let resetbutton: HTMLElement

  beforeEach(() => {
    user = userEvent.setup()
    render(<DeliveryFeeForm />)
    header = screen.getByText(/Delivery Fee Calculator/i)
    cartvalueinput = screen.getByTestId('cartValue')
    distanceinput = screen.getByTestId('deliveryDistance')
    itemsinput = screen.getByTestId('numberOfItems')
    dateinput = screen.getByTestId('orderTime')
    submitbutton = screen.getByTestId('calculateButton')
    resetbutton = screen.getByTestId('resetButton')
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

  it('renders the calculated delivery fee', async () => {
    const cartValue = '3'
    const distance = '1000'
    const items = '10'
    const date = '29/04/2024'

    await user.type(cartvalueinput, cartValue)
    await user.type(distanceinput, distance)
    await user.type(itemsinput, items)
    await user.type(dateinput, date)
    await user.click(submitbutton)

    const deliveryfee = screen.getByTestId('fee')
    expect(deliveryfee).toBeInTheDocument()
    expect(deliveryfee).toHaveTextContent(/Delivery fee: 12.00 €/i)
  })
})