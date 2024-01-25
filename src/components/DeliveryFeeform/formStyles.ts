// Contains the styles for the DeliveryFeeForm components.
const formStyles = {
  box: { 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    marginTop: 8, 
    gap: 2 
  },
  submitButton: {
    backgroundColor: 'rgb(0, 157, 224)',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: 'rgb(0, 157, 224)',
      opacity: 0.8,
    },
  },
}

export default formStyles
