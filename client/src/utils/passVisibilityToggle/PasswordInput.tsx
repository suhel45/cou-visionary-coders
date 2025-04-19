import React, { useState } from 'react';
import { OutlinedInput, InputAdornment, FormControl, InputLabel, FormHelperText } from '@mui/material';
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

  // Get the register props
  const registerProps = register(name, {
    required: required ? `${label} is required` : false,
    ...validation,
  });

  return (
    <FormControl
      fullWidth
      variant="outlined"
      margin="normal"
      size="small"
      error={error}
      sx={{
        width: '300px',
      }}
    >
      <InputLabel htmlFor={name} sx={{ fontSize: '0.875rem' }}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={name}
        type={showPassword ? 'text' : 'password'}
        label={label}
        placeholder={placeholder}
        endAdornment={
          <InputAdornment position="end">
            <PasswordVisibilityToggle
              visibilityState={showPassword}
              toggleVisibility={togglePasswordVisibility}
            />
          </InputAdornment>
        }
        sx={{
          padding: '8px',
          borderRadius: '0.375rem',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          height: '48px',
        }}
        {...registerProps}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default PasswordInput;