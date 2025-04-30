import { NextFunction, Request, Response } from 'express';
import { CustomRequest } from '../interfaces/users.interface';
import logger from '../utils/logger.util';

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = (req as CustomRequest).user;
    // Check if user exists in request
    if (!user) {
      res.status(401).json({ message: 'Unauthorized: No user found' });
      return;
    }

    // Check if user has admin role
    if (!user || typeof user !== 'object' || (user as any).role !== 'admin') {
      res.status(403).json({ message: 'Forbidden: Admin access required' });
      return;
    }

    // If user is admin, proceed to the next middleware or route handler
    next();
  } catch (error) {
    logger.error('Error in isAdmin middleware:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
