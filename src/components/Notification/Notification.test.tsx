import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Notification from './Notification'

describe('Notification', () => {
  it('renders correctly', () => {
    render(<Notification message="test message" />)
    const element = screen.getByTestId('notification')
    expect(element).toBeInTheDocument()
    expect(element).toHaveTextContent('test message')
  })

  it('renders nothing if no message is provided', () => {
    render(<Notification message="" />)
    expect(screen.queryByTestId('notification')).not.toBeInTheDocument()
  })
})
