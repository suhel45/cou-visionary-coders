import { IUser } from "../interfaces/users.interface";
import userModel from "../models/user.Model";
import { escape } from 'validator';
import bcrypt from 'bcrypt';;
const saltRounds = 10;

const createUserIntoDB = async(user:IUser)=>{
const {username,contact,email,password}=user;

      const sanitizedEmail = escape(email);
      const existingUser = await userModel.findOne({ email: sanitizedEmail });
      if (existingUser) {
        throw new Error('User already exists!');
      }
      const hasedpassword = await bcrypt.hash(password, saltRounds);
      const newUser = new userModel({
        username,
        contact,
        email,
        password: hasedpassword,
      });
     const result = await newUser.save();
     return result;
};
export const userService = {
    createUserIntoDB,
}