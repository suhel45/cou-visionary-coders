import { Request, Response } from 'express';
import { userService } from '../services/users.service';
import { IUser } from '../interfaces/users.interface';
const createUser = async (req: Request, res: Response) => {
  try {
    const user:IUser = req.body;
    //will call service function to send this data
    const result = await userService.createUserIntoDB(user);
    //send response
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send({ errors: 'registration failed', error });
  }
};
export const userController = {
  createUser,
};
