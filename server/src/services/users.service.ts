import { ILoginInfo, IUser } from '../interfaces/users.interface';
import userModel from '../models/user.Model';
import validator from 'validator';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const createUserIntoDB = async (user: IUser) => {
  const { username, phoneNumber, email, password } = user;

  const sanitizedEmail = validator.escape(email);
  const existingUser = await userModel.findOne({ email: sanitizedEmail });
  if (existingUser) {
    throw new Error('User already exists!');
  }
  const hashedPassword = await argon2.hash(password);
  const newUser = new userModel({
    username,
    phoneNumber,
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

const loginOrCreateUserWithGoogle = async (email: string): Promise<string> => {
  const sanitizedEmail = validator.escape(email);
  let user = await userModel.findOne({ email: sanitizedEmail });
  if (!user) {
    // Create a new user with a default password
    const newUser = new userModel({
      username: sanitizedEmail.split('@')[0], // Use the part before @ as username
      phoneNumber: '00000000000', // Default empty phone number
      email: sanitizedEmail,
      password: await argon2.hash('defaultPassword'), // Default password
    });
    user = await newUser.save();
  }
  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    throw new Error('Internal server error');
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
    message = 'All fields are required'
    return message;
  }

  // Check if passwords match
  if (newPassword !== confirmPassword) {
    message = 'Passwords do not match';
    return message;
  }

  // Validate password strength
  if (newPassword.length < 8) {
    message = 'Password must be at least 8 characters long';
    return message;
  }

  // Find user by email
  const sanitizedEmail = validator.escape(email);
  const user = await userModel.findOne({ email: sanitizedEmail });

  if (!user) {
    message = 'User not found.Please enter a validate email address';
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
