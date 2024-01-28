import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import CustomDatepicker from './CustomDatepicker'
import dayjs, { Dayjs } from 'dayjs';

describe('CustomDatepicker', () => {
  let user: UserEvent;
  let date: Dayjs;
  let mockSetDate: jest.Mock;

  beforeEach(() => {
    user = userEvent.setup()
    date = dayjs()
    mockSetDate = jest.fn()
    render(<CustomDatepicker date={date} setDate={mockSetDate} />)
  })

  it('renders correctly', () => {    
    const element = screen.getByTestId('deliveryDate')
    expect(element).toBeInTheDocument()
  })

  it('allows user to select a date', async () => {
    // CalendarIcon is the test id of the icon that opens the date picker
    const datePickerInput = screen.getByTestId('CalendarIcon')
    await user.click(datePickerInput)

    // gridcell is the role of the day in the calendar
    const day = screen.getByRole('gridcell', { name: '27' });
    await user.click(day)

    expect(mockSetDate).toHaveBeenCalledTimes(1)
  })

   it('allows user to type a date', async () => {
    // deliveryDate is the test id of the input field
    const datePickerInput = screen.getByTestId('deliveryDate')
    await user.type(datePickerInput, '14/2/2024')

    // Extract the date from the last call
    const lastCallDate = mockSetDate.mock.calls[mockSetDate.mock.calls.length - 1][0];

    expect(lastCallDate.year()).toBe(2024);
    expect(lastCallDate.month()).toBe(1); // February is 1 in dayjs (zero-indexed)
    expect(lastCallDate.date()).toBe(14);
  })
})

