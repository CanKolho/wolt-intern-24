import { useState } from 'react'
import { UseFieldReturn } from '../types'

// Custom hook for handling form fields
export const useField = (type: string): UseFieldReturn => {
  const [value, setValue] = useState<string>('')

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value)
  }

  const reset= (): void => setValue('')

  return {
    type,
    value,
    onChange,
    reset
  }
}