import React from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordVisibilityToggleProps {
  visibilityState: boolean;
  toggleVisibility: () => void;
}

const PasswordVisibilityToggle: React.FC<PasswordVisibilityToggleProps> = ({
  visibilityState,
  toggleVisibility,
}) => {
  return (
    <InputAdornment position="end">
      <IconButton onClick={toggleVisibility} edge="end">
        {visibilityState ? <Eye size={20} /> : <EyeOff size={20} />}
      </IconButton>
    </InputAdornment>
  );
};

export default PasswordVisibilityToggle;
