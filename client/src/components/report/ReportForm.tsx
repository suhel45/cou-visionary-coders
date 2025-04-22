import React from "react";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { reasons } from "../../constants/reportOptions";
import CommonButton from "../../utils/Button/CommonButton";


type ReportFormInputs = {
  biodataNo: string;
  reason: string;
  reasonDetails: string;
};

const ReportForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors},
  } = useForm<ReportFormInputs>();

  const [serverError, setServerError] = React.useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = React.useState<string | null>(null);
  const [loading,setLoading] = React.useState(false);

  const onSubmit = async (data: ReportFormInputs) => {
    setServerError(null);
    setServerSuccess(null);
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/report`, data,
        {withCredentials: true},
      );
      setServerSuccess(res.data.message);
      reset();
    } catch (err: any) {
      setServerError(err.response?.data?.message || "Failed to submit report");
    }finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 6 }}>
      <Typography variant="h5" gutterBottom>
        Submit a Report
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="biodataNo"
          control={control}
          defaultValue=""
          rules={{ required: "Biodata No is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Biodata No"
              fullWidth
              margin="normal"
              error={!!errors.biodataNo}
              helperText={errors.biodataNo?.message}
              required
            />
          )}
        />
        <Controller
          name="reason"
          control={control}
          defaultValue=""
          rules={{ required: "Reason is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Reason"
              fullWidth
              margin="normal"
              error={!!errors.reason}
              helperText={errors.reason?.message}
              required
            >
              {reasons.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          name="reasonDetails"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Reason Details"
              fullWidth
              margin="normal"
              multiline
              rows={3}
            />
          )}
        />
        <CommonButton
          type="submit"
          label="Submit Report"
          loading={loading}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          fullWidth
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

export default ReportForm;