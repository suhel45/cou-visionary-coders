import React, { useState } from 'react';
import { TextField } from '@mui/material';
import PasswordVisibilityToggle from './PasswordVisibilityToggle';

interface PasswordInputProps {
  label: string;
  error?: boolean;
  helperText?: string;
  register: any;
  name: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  register,
  name,
  error,
  helperText,
}) => {
  const [showPassword, setShowPassword] = useState(false); // Track password visibility state

  // Toggle visibility of the password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      label={label}
      type={showPassword ? 'text' : 'password'}
      fullWidth
      variant="outlined"
      margin="normal"
      size="small"
      sx={{
        '& .MuiInputBase-root': {
          padding: '8px',
          borderRadius: '0.375rem',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          height: '48px',
        },
        '& .MuiInputLabel-root': {
          fontSize: '0.875rem',
        },
        width: '300px',
      }}
      error={error}
      helperText={helperText}
      {...register(name)}
      slotProps={{
        input: {
          endAdornment: (
            <PasswordVisibilityToggle
              visibilityState={showPassword}
              toggleVisibility={togglePasswordVisibility}
            />
          ),
        },
      }}
    />
  );
};

export default PasswordInput;
