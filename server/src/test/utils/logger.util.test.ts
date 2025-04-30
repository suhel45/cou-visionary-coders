import winston from 'winston';
import logger from '../../utils/logger.util';

// Trigger logger initialization to ensure createLogger is called
logger.info('Test initialization');

// Mock winston's createLogger function
jest.mock('winston', () => {
  const mFormat = {
    combine: jest.fn(),
    timestamp: jest.fn(),
    printf: jest.fn(),
    colorize: jest.fn(),
  };
  const mTransports = {
    File: jest.fn(),
    Console: jest.fn(),
  };
  const mLogger = {
    info: jest.fn(),
    error: jest.fn(),
  };
  return {
    format: mFormat,
    transports: mTransports,
    createLogger: jest.fn(() => mLogger),
  };
});

describe('Logger configuration', () => {
  it('should create logger with proper configuration', () => {
    expect(winston.createLogger).toHaveBeenCalled();
  });

  it('should include File and Console transports', () => {
    expect(winston.transports.File).toHaveBeenCalledTimes(2);
    expect(winston.transports.Console).toHaveBeenCalledTimes(1);
  });

  it('should use combine, timestamp, and printf formatters', () => {
    expect(winston.format.combine).toHaveBeenCalled();
    expect(winston.format.timestamp).toHaveBeenCalled();
    expect(winston.format.printf).toHaveBeenCalled();
  });
});
