import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import CustomDatepicker from './CustomDatepicker'
import dayjs, { Dayjs } from 'dayjs'

describe('CustomDatepicker', () => {
  let user: UserEvent
  let date: Dayjs
  let mockSetDate: jest.Mock
  let mockSetIsDateValid: jest.Mock

  beforeEach(() => {
    user = userEvent.setup()
    date = dayjs()
    mockSetDate = jest.fn()
    mockSetIsDateValid = jest.fn()
    render(<CustomDatepicker date={date} setDate={mockSetDate} setIsDateValid={mockSetIsDateValid}/>)
  })

  it('renders correctly', () => {
    const element = screen.getByTestId('orderTime')
    expect(element).toBeInTheDocument()
  })

  it('allows user to select a date', async () => {
    /**
     * @calendarIcon is the data-testid of the MUI icon that opens the date picker
     * @datePickerInput is the data-testid of the input field
     */
    const datePickerInput = screen.getByTestId('CalendarIcon')
    await user.click(datePickerInput)

    /// getByRole is a query that allows us to find elements by their role - name is the text content of the element
    const day = screen.getByRole('gridcell', { name: date.date().toString() })
    await user.click(day)

    expect(mockSetDate).toHaveBeenCalledTimes(1)
  })

  it('allows user to type a date', async () => {
    // deliveryDate is the test id of the input field
    const datePickerInput = screen.getByTestId('orderTime')
    await user.type(datePickerInput, '14/4/2024')

    // Extract the date from the last call
    const lastCallDate = mockSetDate.mock.calls[mockSetDate.mock.calls.length - 1][0]

    expect(lastCallDate.year()).toBe(2024)
    expect(lastCallDate.month()).toBe(3) // April is 3 in dayjs (zero-indexed)
    expect(lastCallDate.date()).toBe(14)
  })
})

