import React from 'react';
import { Button, CircularProgress } from '@mui/material';

interface CommonButtonProps {
  type?: 'button' | 'submit' | 'reset';
  label: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  sx?: object;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  type = 'button',
  label,
  onClick,
  loading = false,
  disabled = false,
  fullWidth = false,
  color = 'primary', // Default to 'primary'
  sx = {},
}) => {
  return (
    <Button
      type={type}
      variant="contained"
      color={color}
      fullWidth={fullWidth}
      onClick={onClick}
      disabled={loading || disabled}
      sx={{
        width: '300px',
        marginTop: 2,
        textAlign: 'center',
        ...sx,
      }}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : label}
    </Button>
  );
};

export default CommonButton;
