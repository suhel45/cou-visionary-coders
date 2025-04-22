import React from 'react';
import { Box, TextField, Typography, Paper, Alert } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import CommonButton from '../../utils/Button/CommonButton';

type SupportFormInputs = {
  message: string;
};

const SupportForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<SupportFormInputs>();

  const [serverError, setServerError] = React.useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data: SupportFormInputs) => {
    setServerError(null);
    setServerSuccess(null);
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/support`,
        data,
        { withCredentials: true },
      );
      setServerSuccess(res.data.message);
      reset();
    } catch (err: any) {
      setServerError(
        err.response?.data?.message || 'Failed to submit support request',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 6 }}>
      <Typography variant="h5" gutterBottom>
        Submit a Support Request
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="message"
          control={control}
          defaultValue=""
          rules={{
            required: 'Message is required',
            validate: (value) => {
              const wordCount = value
                .trim()
                .split(/\s+/)
                .filter((word) => word.length > 0).length;
              return (
                wordCount >= 10 || 'Message must contain at least 10 words'
              );
            },
          }}
          render={({ field }) => (
            <>
              <TextField
                {...field}
                label="Message"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                error={!!errors.message}
                helperText={
                  errors.message?.message || 'Minimum 10 words required'
                }
                required
              />
              {field.value && (
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ ml: 1 }}
                >
                  Word count:{' '}
                  {
                    field.value
                      .trim()
                      .split(/\s+/)
                      .filter((word) => word.length > 0).length
                  }
                  /10
                </Typography>
              )}
            </>
          )}
        />
        <CommonButton
          type="submit"
          label="Submit"
          loading={loading}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          fullWidth
          disabled={!isValid || loading}
        />
        {serverSuccess && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {serverSuccess}
          </Alert>
        )}
        {serverError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {serverError}
          </Alert>
        )}
      </Box>
    </Paper>
  );
};

export default SupportForm;
