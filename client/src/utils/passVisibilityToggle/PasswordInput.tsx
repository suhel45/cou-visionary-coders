import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import PasswordVisibilityToggle from './PasswordVisibilityToggle';

interface PasswordInputProps {
  label: string;
  error?: boolean;
  helperText?: string;
  register: any;
  name: string;
  placeholder?: string;
  required?: boolean;
  validation?: object;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  register,
  name,
  error,
  helperText,
  placeholder,
  required = false,
  validation = {},
}) => {
  const [showPassword, setShowPassword] = useState(false);

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
      placeholder={placeholder}
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
      {...register(name, {
        required: required ? `${label} is required` : false,
        ...validation,
      })}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <PasswordVisibilityToggle
              visibilityState={showPassword}
              toggleVisibility={togglePasswordVisibility}
            />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput;
