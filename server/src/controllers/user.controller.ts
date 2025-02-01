import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import userModel from '../models/user.Model';
const saltRounds = 10;
const createUser = async (req: Request, res: Response) => {
  try {
    const {
      email,
      birthdate,
      phoneNumber,
      weight,
      height,
      complexion,
      bloodGroup,
      password,
      confirmPassword,
    } = req.body;
    // Ensure passwords match
    if (password !== confirmPassword) {
      res.status(400).json({ message: 'Passwords do not match!' });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists!' });
    }

    const hasedpassword = await bcrypt.hash(password, saltRounds);
    const user = new userModel({
      email,
      password: hasedpassword,
      birthdate,
      phoneNumber,
      weight,
      height,
      complexion,
      bloodGroup,
    });
    user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send({ errors: 'registration failed', error });
  }
};
export const userController = {
  createUser,
};
