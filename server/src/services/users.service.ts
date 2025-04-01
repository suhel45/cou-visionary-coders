import { ILoginInfo, IUser } from '../interfaces/users.interface';
import userModel from '../models/user.Model';
import validator from 'validator';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'; 
import dotenv from 'dotenv';

dotenv.config();

const createUserIntoDB = async (user: IUser) => {
  const { username, email, password } = user;

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

const loginOrCreateUserWithGoogle = async (email: string,username:string): Promise<string> => {
  
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

  // Validate password strength
  if (newPassword.length < 8) {
    message = 'Password must be at least 8 characters long';
    return message;
  }

  const hashedPassword = await argon2.hash(newPassword);

  // Update user's password
  user.password = hashedPassword;
  await user.save();

  message = 'Password updated successfully';
  return message;
};

export const userService = {
  createUserIntoDB,
  loginUserFromDB,
  loginOrCreateUserWithGoogle,
  ResetPassword,
};
