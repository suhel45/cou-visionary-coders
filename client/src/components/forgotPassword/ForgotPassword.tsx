import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Container, Box, CircularProgress } from '@mui/material';
import axios from 'axios'; 

interface FormData {
  email: string;
}

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors },reset } = useForm<FormData>();
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);


  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      // Send the request using Axios
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/forgot-password`, {
        email: data.email,
      });

      setLoading(false);

      // Check if the response is successful
      if (response.status === 200) {
        setMessage(response.data.message);
        reset();
      } else {
        setMessage('An error occurred. Please try again.');
      }
    } catch(error) {
      setLoading(false);

      if (axios.isAxiosError(error) && error.response) {
        //  specific error message from server response
        const errorMessage = error.response.data?.message || 'Something went wrong on the server. Please try again later.';
        setMessage(errorMessage); 
      } else if (axios.isAxiosError(error) && error.request) {

        setMessage('No response from the server. Please check your network connection.');
      } else {
        setMessage('Error sending reset link. Please try again later.');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Forgot Password
        </Typography>
        
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <TextField
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            margin="normal"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email address',
              },
            })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 , marginBottom: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Reset Link'}
          </Button>
        </form>

        {message && (
          <Typography
            variant="body2"
            color={message.includes('Reset link sent') ? 'success' : 'error'}
            sx={{ marginTop: 2,marginBottom: 2, textAlign: 'center' }}
          >
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ForgotPassword;
