import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Typography, Container, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import PasswordInput from '../../utils/passVisibilityToggle/PasswordInput';
import CommonButton from '../../utils/Button/CommonButton';
import { updatePassword } from 'firebase/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

interface FormData {
  newPassword: string;
  confirmPassword: string;
}

const ResetForgotPassword = () => {
  const { resetToken } = useParams<{ resetToken: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>();

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('error');
  const [loading, setLoading] = useState(false);

  const watchNewPassword = watch('newPassword');

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      // Step 1: Update password in your backend
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/reset-password/${resetToken}`,
        {
          newPassword: data.newPassword,
        }
      );

      if (response.status === 200) {
        // Step 2: Authenticate the user in Firebase using the reset token
        const auth = getAuth();
        const email = response.data.email; // Assuming the backend returns the user's email
        const tempPassword = response.data.tempPassword; // Assuming the backend provides a temporary password

        // Sign in with the temporary credentials
        const userCredential = await signInWithEmailAndPassword(auth, email, tempPassword);

        // Step 3: Update the password in Firebase
        await updatePassword(userCredential.user, data.newPassword);

        setMessage('Password reset successfully in both backend and Firebase. Redirecting to login...');
        setMessageType('success');
        reset();

        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setMessage('An error occurred. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      setLoading(false);

      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.message ??
          'Something went wrong on the server. Please try again later.';
        setMessage(errorMessage);
      } else if (axios.isAxiosError(error) && error.request) {
        setMessage(
          'No response from the server. Please check your network connection.'
        );
      } else {
        setMessage('Error resetting password. Please try again later.');
      }
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const passwordValidation = {
    required: 'New password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters',
    },
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
          <PasswordInput
            label="New Password"
            name="newPassword"
            register={register}
            required={true}
            validation={passwordValidation}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message ?? ''}
          />

          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            register={register}
            required={true}
            validation={{
              required: 'Please confirm your password',
              validate: (value: string) =>
                value === watchNewPassword || 'Passwords do not match',
            }}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message ?? ''}
          />

          <Box sx={{ width: '300px', mt: 2, mb: 2 }}>
            <CommonButton
              type="submit"
              label="Reset Password"
              loading={loading}
              fullWidth
            />
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default ResetForgotPassword;