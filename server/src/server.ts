import dotenv from 'dotenv';
import app from './app';
import connectDB from './db/database.connection';

dotenv.config();

const port = process.env.PORT || 3000;

// Connect to database first
connectDB()
  .then(() => {
    const server = app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });

    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received: closing HTTP server');
      server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
      });
    });
  })
  .catch((error) => {
    console.error('DATABASE CONNECTION ERROR:', error);
    process.exit(1);
  });
