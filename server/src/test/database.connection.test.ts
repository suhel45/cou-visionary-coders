import mongoose from 'mongoose';
import connectDB from '../db/database.connection';

jest.mock('mongoose', () => {
  const mConnection = {
    on: jest.fn(),
  };

  return {
    connect: jest.fn(),
    connection: mConnection,
  };
});

describe('connectDB', () => {
  const mockConnect = mongoose.connect as jest.Mock;
  const mockOn = mongoose.connection.on as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.DATABASE_URL = 'mongodb://localhost:27017/test';
  });

  it('should connect to MongoDB and setup event listeners', async () => {
    mockConnect.mockResolvedValueOnce({});

    await connectDB();

    expect(mockConnect).toHaveBeenCalledWith('mongodb://localhost:27017/test', {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    expect(mockOn).toHaveBeenCalledWith('connected', expect.any(Function));
    expect(mockOn).toHaveBeenCalledWith('error', expect.any(Function));
    expect(mockOn).toHaveBeenCalledWith('disconnected', expect.any(Function));
  });

  it('should retry on connection failure', async () => {
    jest.useFakeTimers(); // to simulate setTimeout
    const retrySpy = jest.spyOn(global, 'setTimeout');

    mockConnect.mockRejectedValueOnce(new Error('Failed to connect'));

    await connectDB();

    expect(mockConnect).toHaveBeenCalled();
    expect(retrySpy).toHaveBeenCalledWith(expect.any(Function), 5000);

    jest.useRealTimers();
  });
});
