import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Typography,
  Container,
  Box,
  Alert,
  InputAdornment,
  Link,
} from '@mui/material';
import { Mail } from 'lucide-react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import CommonButton from '../../utils/Button/CommonButton';

interface FormData {
  email: string;
}

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('error');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/forgot-password`,
        {
          email: data.email,
        },
      );

      setLoading(false);

      if (response.status === 200) {
        setMessageType('success');
        setMessage(
          response.data.message ||
            'Reset link sent successfully. Please check your email.',
        );
        reset();
      } else {
        setMessageType('error');
        setMessage('An error occurred. Please try again.');
      }
    } catch (error) {
      setLoading(false);
      setMessageType('error');

      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.message ||
          'Something went wrong on the server. Please try again later.';
        setMessage(errorMessage);
      } else if (axios.isAxiosError(error) && error.request) {
        setMessage(
          'No response from the server. Please check your network connection.',
        );
      } else {
        setMessage('Error sending reset link. Please try again later.');
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mb: 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 4,
          padding: 3,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          marginTop: 4,
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom fontWeight="500">
          Forgot Password
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3, textAlign: 'center' }}
        >
          Enter your email address below and we'll send you a link to reset your
          password.
        </Typography>

        {message && (
          <Alert severity={messageType} sx={{ width: '100%', marginBottom: 2 }}>
            {message}
          </Alert>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <TextField
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            margin="normal"
            size="small"
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: '0.375rem',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
              },
            }}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Please enter a valid email address',
              },
            })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />

          <CommonButton
            type="submit"
            label="Send Reset Link"
            loading={loading}
            fullWidth
            sx={{ mt: 2, mb: 2 }}
          />
        </form>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Remember your password?{' '}
            <Link
              component={RouterLink}
              to="/login"
              underline="hover"
              sx={{ fontWeight: 500 }}
            >
              Back to Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
