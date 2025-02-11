import { Request, Response } from 'express';
import { userService } from '../services/users.service';
import { ILoginInfo, IUser } from '../interfaces/users.interface';

const createUser = async (req: Request, res: Response) => {
  try {
    const userInfo: IUser = req.body;
    //will call service function to send this data
    const result = await userService.createUserIntoDB(userInfo);
    //send response
    res.status(200).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'User already exists!') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).send({ errors: 'registration failed', error });
    }
  }
};

const loginUser = (req:Request,res:Response) => {
  try {
    const loginInfo:ILoginInfo = req.body;

    const result = await userService.loginUserFromDB(loginInfo)
  }catch(error){
    res.status(500).send({errors:'login failed',error});
  }
}
export const userController = {
  createUser,
  loginUser,
};
