import React from 'react';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

interface FormData {
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      // Send the request using Axios
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/reset-password`,
        {
          newPassword: data.newPassword,
        },
      );

      setLoading(false);

      // Check if the response is successful
      if (response.status === 200) {
        setMessage('Password reset successfully.');
        reset();
      } else {
        setMessage('An error occurred. Please try again.');
      }
    } catch (error) {
      setLoading(false);

      if (axios.isAxiosError(error) && error.response) {
        // specific error message from server response
        const errorMessage =
          error.response.data?.message ||
          'Something went wrong on the server. Please try again later.';
        setMessage(errorMessage);
      } else if (axios.isAxiosError(error) && error.request) {
        setMessage(
          'No response from the server. Please check your network connection.',
        );
      } else {
        setMessage('Error resetting password. Please try again later.');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 4,
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Reset Password
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <TextField
            id="newPassword"
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            margin="normal"
            {...register('newPassword', {
              required: 'New password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            })}
            error={!!errors.newPassword}
            helperText={errors.newPassword ? errors.newPassword.message : ''}
          />

          <TextField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="outlined"
            margin="normal"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === watch('newPassword') || 'Passwords do not match',
            })}
            error={!!errors.confirmPassword}
            helperText={
              errors.confirmPassword ? errors.confirmPassword.message : ''
            }
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2, marginBottom: 2 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Reset Password'
            )}
          </Button>
        </form>

        {message && (
          <Typography
            variant="body2"
            color={message.includes('successfully') ? 'success' : 'error'}
            sx={{ marginTop: 2, marginBottom: 2, textAlign: 'center' }}
          >
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ResetPassword;
