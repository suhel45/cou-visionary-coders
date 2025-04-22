import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

type SupportFormInputs = {
  message: string;
};

const SupportForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SupportFormInputs>();

  const [serverError, setServerError] = React.useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = React.useState<string | null>(null);

  const onSubmit = async (data: SupportFormInputs) => {
    setServerError(null);
    setServerSuccess(null);
    try {
      const res = await axios.post("/api/support", data);
      setServerSuccess(res.data.message);
      reset();
    } catch (err: any) {
      setServerError(err.response?.data?.message || "Failed to submit support request");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 6 }}>
      <Typography variant="h5" gutterBottom>
        Submit a Support Request
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="message"
          control={control}
          defaultValue=""
          rules={{ required: "Message is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Message"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              error={!!errors.message}
              helperText={errors.message?.message}
              required
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          fullWidth
        >
          Submit
        </Button>
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