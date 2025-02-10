import { IUser } from '../interfaces/users.interface';
import userModel from '../models/user.Model';
import { escape } from 'validator';
import argon2 from 'argon2';

const createUserIntoDB = async (user: IUser) => {
  const { username, contact, email, password } = user;

  const sanitizedEmail = escape(email);
  const existingUser = await userModel.findOne({ email: sanitizedEmail });
  if (existingUser) {
    throw new Error('User already exists!');
  }
  const hashedPassword = await argon2.hash(password);
  const newUser = new userModel({
    username,
    contact,
    email,
    password: hashedPassword,
  });
  const result = await newUser.save();
  return result;
};
export const userService = {
  createUserIntoDB,
};
