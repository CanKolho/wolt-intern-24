import Button from '@mui/material/Button';
import { CustomButtonProps } from '../../types';

// Values with defaults are destructured from the props object and others values are passed using the spread operator
const CustomButton = ({ type = 'button', color = 'primary', variant = 'contained', ...props }: CustomButtonProps) => (
  <Button
    fullWidth
    type={type}
    onClick={props.handleClick}
    color={color}
    variant={variant}
    data-testid={props.testId}
    data-test-id={props.testId}
    disabled={props.disabled}
  >
    {props.label}
  </Button>
);

export default CustomButton;
