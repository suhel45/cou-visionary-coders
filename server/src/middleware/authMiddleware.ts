import { Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { CustomRequest, DecodedToken } from '../interfaces/users.interface';
import userModel from '../models/user.Model';

dotenv.config();

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ message: 'Unauthorized Access' });
      return;
    }

    const secretKey = process.env.JWT_SECRET_KEY as string;
    if (!secretKey) {
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    const decoded = jwt.verify(token, secretKey) as DecodedToken;

    // Fetch user from DB to get the role
    const user = await userModel.findById(decoded.id).lean();
    if (!user) {
      res.status(401).json({ message: 'Unauthorized: User not found' });
      return;
    }

    // Attach user with role to request
    (req as CustomRequest).user = {
      id: decoded.id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
};
