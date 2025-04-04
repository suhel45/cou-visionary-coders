import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PasswordInput from '../../utils/passVisibilityToggle/PasswordInput';

interface FormData {
  newPassword: string;
  confirmPassword: string;
}

const ResetForgotPassword = () => {
  const { resetToken } = useParams<{ resetToken: string }>();

  const {
    register,
    handleSubmit,
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
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/reset-password/${resetToken}`,
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // Center all child elements
            width: '100%',
          }}
        >
          <PasswordInput
            label="New Password"
            register={register}
            name="newPassword"
            error={!!errors.newPassword}
            helperText={errors.newPassword ? errors.newPassword.message : ''}
          />

          <PasswordInput
            label="Confirm Password"
            register={register}
            name="confirmPassword"
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
            sx={{
              width: '300px',
              marginTop: 2,
              textAlign: 'center',
            }}
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

export default ResetForgotPassword;
