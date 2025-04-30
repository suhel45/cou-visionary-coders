import { isAdmin } from '../../middleware/admin.middleware';
import { Request, Response, NextFunction } from 'express';
import logger from '../../utils/logger.util';

// Extend the Request interface to include the user property
interface CustomRequest extends Request {
  user?: { role: string };
}

// Mock logger to avoid console output
jest.mock('../../utils/logger.util');

describe('isAdmin middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should return 401 if no user on request', async () => {
    await isAdmin(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Unauthorized: No user found',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 403 if user is not admin', async () => {
    (req as CustomRequest).user = { role: 'user' }; // not admin
    await isAdmin(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(403);
    (req as CustomRequest).user = { role: 'admin' };
    await isAdmin(req as CustomRequest, res as Response, next);
  });

  it('should call next() if user is admin', async () => {
    (req as CustomRequest).user = { role: 'admin' };
    await isAdmin(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should handle unexpected errors', async () => {
    const error = new Error('test error');
    Object.defineProperty(req, 'user', {
      get: () => {
        throw error; // simulate internal failure
      },
    });

    await isAdmin(req as Request, res as Response, next);

    expect(logger.error).toHaveBeenCalledWith(
      'Error in isAdmin middleware:',
      error,
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    expect(next).not.toHaveBeenCalled();
  });
});
