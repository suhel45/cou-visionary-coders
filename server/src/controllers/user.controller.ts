import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { userService } from '../services/users.service';
import { ILoginInfo, IUser } from '../interfaces/users.interface';
import logger from '../utils/logger.util';

dotenv.config();

const createUser = async (req: Request, res: Response) => {
  try {
    const userInfo: IUser = req.body;
    const result = await userService.createUserIntoDB(userInfo);

    res.status(200).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'User already exists!') {
      logger.error(`User already exists: ${error.message}`);
      res.status(400).json({ message: 'User already exists!' });
    } else {
      logger.error(`Unexpected error of createuser:${error}`);
      res.status(500).json({
        message: 'An unexpected error occurred. Please try again later.',
      });
    }
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const loginInfo: ILoginInfo = req.body;

    const { userId, token } = await userService.loginUserFromDB(loginInfo);

    //set the token as an httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      userId: userId,
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Unexpected error:${error.message}`);
    }
    res.status(500).json({
      message: 'An unexpected error occurred. Please try again later.',
    });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    const result = await userService.ResetPassword(
      email,
      currentPassword,
      newPassword,
    );

    res.status(200).json({
      message: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Reset Password Error:${error.message}`);
    }
    res.status(500).json({
      message: 'Server error occurred',
    });
  }
};

const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const result = await userService.ForgotPassword(email);

    // Check the result and send appropriate response
    if (
      result ===
      'Reset link sent to your email.please check your email or email spam folder'
    ) {
      res.status(200).json({
        success: true,
        message: result,
      });
    } else {
      res.status(400).json({
        success: false,
        message: result,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Forget Password Error:${error.message}`);
    }
    res.status(500).json({
      success: false,
      message: 'Server error occurred.please try again later',
    });
  }
};

const resetPasswordWithToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const result = await userService.ResetPasswordWithToken(token, newPassword);

    if (result === 'Password reset successfully') {
      res.status(200).json({
        success: true,
        message: result,
      });
    } else {
      res.status(400).json({
        success: false,
        message: result,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Reset Password with Token Error:${error.message}`);
    }
    res.status(500).json({
      message: 'Server error occurred',
    });
  }
};
const getUserSignupStats = async (req: Request, res: Response) => {
  try {
    const stats = await userService.getUserSignupsByMonth();
    res.status(200).json({
      success: true,
      data: stats,
      message: 'User signup statistics retrieved successfully',
    });
  } catch (error) {
    console.error('Error fetching user signup stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve user signup statistics',
    });
  }
};

export const userController = {
  createUser,
  loginUser,
  resetPassword,
  forgotPassword,
  resetPasswordWithToken,
  getUserSignupStats,
};
