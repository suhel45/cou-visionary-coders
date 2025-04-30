import {
  ILoginInfo,
  IUser,
  MonthlyUserStats,
} from '../interfaces/users.interface.js';
import userModel from '../models/user.Model';
import validator from 'validator';
import nodemailer from 'nodemailer';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { validatePassword } from '../utils/validation.password.util';
import logger from '../utils/logger.util';
import { generateToken } from '../utils/token.util';
import { validateEmail } from '../utils/validation.email.util';

dotenv.config();

const createUserIntoDB = async (user: IUser) => {
  const { username, email, password } = user;

  // Validate the email
  const emailValidationError = validateEmail(email);
  if (emailValidationError) {
    logger.error(`Email validation failed: ${emailValidationError}`);
    return emailValidationError;
  }

  const sanitizedEmail = validator.escape(email);
  const existingUser = await userModel.findOne({ email: sanitizedEmail });
  if (existingUser) {
    throw new Error('User already exists!');
  }
  const hashedPassword = await argon2.hash(password);
  const newUser = new userModel({
    username,
    email,
    password: hashedPassword,
  });
  const result = await newUser.save();
  return result;
};

const loginUserFromDB = async (
  loginInfo: ILoginInfo,
): Promise<{ userId: string; token: string }> => {
  const { email, password } = loginInfo;

  const sanitizedEmail = validator.escape(email);
  const user = await userModel.findOne({ email: sanitizedEmail });
  if (!user) {
    throw new Error('User not found');
  }
  const isPasswordValid = await argon2.verify(user.password, password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }
  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    throw new Error('Internal server error');
  }
  const token = jwt.sign({ id: user._id, email: user.email }, secretKey, {
    expiresIn: '1h',
  });
  return { userId: user._id.toString(), token };
};

const loginOrCreateUserWithGoogle = async (
  email: string,
  username: string,
): Promise<string> => {
  if (!validator.isEmail(email)) {
    throw new Error('Invalid email format');
  }

  const sanitizedEmail = validator.escape(email);
  let user = await userModel.findOne({ email: sanitizedEmail });

  if (!user) {
    // Generate a random password
    const randomPassword = crypto.randomBytes(16).toString('hex');
    // Hash the random password
    const hashedPassword = await argon2.hash(randomPassword);

    const newUser = new userModel({
      username,
      email: sanitizedEmail,
      password: hashedPassword,
    });
    user = await newUser.save();
  }

  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    throw new Error('JWT secret key not configured');
  }

  const token = jwt.sign({ id: user._id, email: user.email }, secretKey, {
    expiresIn: '1h',
  });

  return token;
};

const ResetPassword = async (
  email: string,
  currentPassword: string,
  newPassword: string,
) => {
  let message = '';

  // Input validation
  if (!email || !currentPassword || !newPassword) {
    message = 'All fields are required';
    return message;
  }

  // Find user by email
  const sanitizedEmail = validator.escape(email);
  const user = await userModel.findOne({ email: sanitizedEmail });

  if (!user) {
    message = 'User not found.Please enter a validate email address';
    return message;
  }

  // Verify current password
  const isMatch = await argon2.verify(user.password, currentPassword);

  if (!isMatch) {
    message = 'Current password is incorrect';
    return message;
  }

  // Prevent using the same password
  const isSamePassword = await argon2.verify(user.password, newPassword);

  if (isSamePassword) {
    message = 'New password cannot be the same as the current password';
    return message;
  }

  // Validate the new password
  const validationError = validatePassword(newPassword);
  if (validationError) {
    return validationError;
  }

  const hashedPassword = await argon2.hash(newPassword);

  // Update user's password
  user.password = hashedPassword;
  await user.save();

  message = 'Password updated successfully';
  return message;
};

const ForgotPassword = async (email: string): Promise<string> => {
  // Find user by email
  const sanitizedEmail = validator.escape(email);
  const user = await userModel.findOne({ email: sanitizedEmail });

  if (!user) {
    logger.error(`User not found for email: ${email}`);
    return 'User not found. Please enter a valid email address';
  }

  // Generate a reset token and save it to the user's record
  const resetToken = generateToken();
  user.resetToken = resetToken;
  user.tokenExpire = new Date(Date.now() + 15 * 60 * 1000); // 15 minute expiration
  await user.save();

  const frontendUrl = process.env.FRONTEND_BASE_URL;

  // Send the reset token to the user's email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Password Reset',
    html: `Click the link to reset your password. This link is valid for 15 minutes: <a href="${resetUrl}">Reset Password</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return 'Reset link sent to your email.please check your email or email spam folder';
  } catch (error) {
    logger.error(`Error sending email: ${error}`);
    return 'Failed to send reset link. Please try again later.';
  }
};

const ResetPasswordWithToken = async (token: string, newPassword: string) => {
  // Find user by reset token
  const user = await userModel.findOne({
    resetToken: token,
    tokenExpire: { $gt: Date.now() }, // Check if token is not expired
  });
  if (!user) {
    return 'Invalid or expired reset token';
  }

  // Validate the new password
  const validationError = validatePassword(newPassword);
  if (validationError) {
    return validationError;
  }

  // Hash the new password
  const hashedPassword = await argon2.hash(newPassword);

  // Prevent using the same password
  const isSamePassword = await argon2.verify(user.password, newPassword);
  if (isSamePassword) {
    return 'New password cannot be the same as the current password';
  }

  // Update user's password and clear reset token
  user.password = hashedPassword;
  user.resetToken = '';
  user.tokenExpire = null;
  await user.save();
  return 'Password reset successfully';
};

const getUserSignupsByMonth = async (): Promise<MonthlyUserStats[]> => {
  const result = await userModel.aggregate([
    {
      $group: {
        _id: {
          month: { $month: '$createdAt' },
          year: { $year: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        month: '$_id.month',
        year: '$_id.year',
        count: 1,
      },
    },
    {
      $sort: {
        year: 1,
        month: 1,
      },
    },
  ]);

  return result;
};

export const userService = {
  createUserIntoDB,
  loginUserFromDB,
  loginOrCreateUserWithGoogle,
  ResetPassword,
  ForgotPassword,
  ResetPasswordWithToken,
  getUserSignupsByMonth,
};
