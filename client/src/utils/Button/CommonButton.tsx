import React from 'react';
import { Button, CircularProgress } from '@mui/material';

interface CommonButtonProps {
  type?: 'button' | 'submit' | 'reset';
  label: string;
  loadingLabel?: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
  variant?: 'text' | 'contained' | 'outlined';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  sx?: object;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  type = 'button',
  label,
  loadingLabel,
  onClick,
  loading = false,
  disabled = false,
  fullWidth = false,
  color = 'primary',
  size = 'medium',
  variant = 'contained',
  startIcon,
  endIcon,
  sx = {},
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      fullWidth={fullWidth}
      onClick={onClick}
      disabled={loading || disabled}
      size={size}
      startIcon={!loading && startIcon}
      endIcon={!loading && endIcon}
      sx={{
        borderRadius: '50px',
        padding: '8px 24px',
        textTransform: 'none', // Prevents all-caps
        fontWeight: 500,
        boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          boxShadow: '0 5px 8px rgba(0, 0, 0, 0.15)',
        },
        minWidth: size === 'small' ? '100px' : '140px',
        height: size === 'small' ? '36px' : size === 'large' ? '48px' : '40px',
        ...sx,
      }}
    >
      {loading ? (
        <>
          <CircularProgress
            size={size === 'small' ? 18 : 20}
            color="inherit"
            sx={{ mx: 1 }}
          />
          {loadingLabel}
        </>
      ) : (
        label
      )}
    </Button>
  );
};

export default CommonButton;
