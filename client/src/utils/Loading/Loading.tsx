import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface LoadingProps {
  size?: number;
  color?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | 'inherit';
  message?: string;
  progress?: number;
  thickness?: number;
}

const Loading: React.FC<LoadingProps> = ({
  size = 50,
  color = 'primary',
  message = 'Loading...',
  progress,
  thickness = 3.6,
}) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          size={size}
          color={color}
          variant={progress !== undefined ? 'determinate' : 'indeterminate'}
          value={progress ?? 0}
          thickness={thickness}
        />
        {progress !== undefined && (
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
            >{`${Math.round(progress)}%`}</Typography>
          </Box>
        )}
      </Box>

      {message && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </div>
  );
};

export default Loading;
