import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';

const Notification = ({ message }: { message: string }) => {
  if (!message) return null;

  return (
    <Box width="100%" data-testid='notification'>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
}

export default Notification;