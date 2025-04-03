import { createLogger, format, transports } from 'winston';
import path from 'path';

// Define log file paths
const logFilePath = path.join(__dirname, '../../logs/app.log');
const errorLogFilePath = path.join(__dirname, '../../logs/error.log');

// Create the logger instance
const logger = createLogger({
  level: 'info', // Default log level
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
    }),
  ),
  transports: [
    // Log all messages to app.log
    new transports.File({ filename: logFilePath }),

    // Log only error messages to error.log
    new transports.File({ filename: errorLogFilePath, level: 'error' }),

    // Log to the console
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
        }),
      ),
    }),
  ],
});

// Export the logger instance
export default logger;
