import { ILoginInfo, IUser } from '../interfaces/users.interface';
import userModel from '../models/user.Model';
import { escape } from 'validator';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const createUserIntoDB = async (user: IUser) => {
  const { username, phoneNumber, email, password } = user;

  const sanitizedEmail = escape(email);
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


const loginUserFromDB = async (loginInfo: ILoginInfo): Promise<string> => {
  const { email, password } = loginInfo;
  
  const sanitizedEmail = escape(email);
  const user = await userModel.findOne({email: sanitizedEmail});
  if(!user){
    throw new Error('User not found');
  }
  const isPasswordValid = await argon2.verify(user.password, password);
  if(!isPasswordValid) {
    throw new Error('Invalid password');
  }
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error('JWT_SECRET_KEY is not defined');
  }
  const token = jwt.sign({id: user._id, email: email}, process.env.JWT_SECRET_KEY);
  console.log(token);
  return token;
};

export const userService = {
  createUserIntoDB,
  loginUserFromDB,
};
