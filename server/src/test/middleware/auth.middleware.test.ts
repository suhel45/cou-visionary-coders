import { verifyToken } from '../../middleware/authMiddleware';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import userModel from '../../models/user.Model';

jest.mock('jsonwebtoken');
jest.mock('../../models/user.Model');

describe('verifyToken middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  const mockDecoded = { id: '12345', email: 'admin@example.com' };

  beforeEach(() => {
    req = {
      cookies: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('should return 401 if no token is present', async () => {
    await verifyToken(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized Access' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 500 if JWT_SECRET_KEY is missing', async () => {
    req.cookies = req.cookies || {};
    req.cookies.token = 'fake-token';
    const originalEnv = process.env.JWT_SECRET_KEY;
    delete process.env.JWT_SECRET_KEY;

    await verifyToken(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    expect(next).not.toHaveBeenCalled();

    process.env.JWT_SECRET_KEY = originalEnv; // Restore env
  });

  it('should return 401 if user not found in DB', async () => {
    req.cookies = req.cookies || {};
    req.cookies.token = 'valid-token';
    (jwt.verify as jest.Mock).mockReturnValue(mockDecoded);
  
    // Properly mock the chained call: findById().lean()
    (userModel.findById as jest.Mock).mockReturnValue({
      lean: jest.fn().mockResolvedValue(null),
    });
  
    process.env.JWT_SECRET_KEY = 'test-secret';
  
    await verifyToken(req as Request, res as Response, next);
  
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized: User not found' });
    expect(next).not.toHaveBeenCalled();
  });
  

  it('should attach user and call next() for valid token and user', async () => {
    req.cookies = req.cookies || {};
    req.cookies.token = 'valid-token';
  
    const mockUser = { _id: '12345', email: 'admin@example.com', role: 'admin' };
    const mockDecoded = { id: '12345' };
  
    (jwt.verify as jest.Mock).mockReturnValue(mockDecoded);
    (userModel.findById as jest.Mock).mockReturnValue({
      lean: () => Promise.resolve(mockUser),
    });
  
    process.env.JWT_SECRET_KEY = 'test-secret';
  
    await verifyToken(req as Request, res as Response, next);
  
    expect((req as any).user).toEqual({
      id: mockDecoded.id,
      email: mockUser.email,
      role: mockUser.role,
    });
  
    expect(next).toHaveBeenCalled();
  });
    it('should return 401 if token is invalid or verification fails', async () => {
    req.cookies = req.cookies || {};
    req.cookies.token = 'bad-token';
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    process.env.JWT_SECRET_KEY = 'test-secret';

    await verifyToken(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token' });
    expect(next).not.toHaveBeenCalled();
  });
});
