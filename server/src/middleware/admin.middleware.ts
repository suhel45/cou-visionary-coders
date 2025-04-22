import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../interfaces/users.interface";
import logger from "../utils/logger.util";

export const isAdmin = async (req:Request, res:Response, next:NextFunction) => {
  try {
      const user = (req as CustomRequest).user;
    // Check if user exists in request 
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: No user found' });
    }
    
    // Check if user has admin role
    if (typeof user !== 'object' || user === null || (user as any).role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }
    
    // If user is admin, proceed to the next middleware or route handler
    next();
  } catch (error) {
    logger.error('Error in isAdmin middleware:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
