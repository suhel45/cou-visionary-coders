import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import userModel from "../models/user.Model";
const saltRounds = 10;
const createUser = async(req:Request,res:Response)=>{
    const {name,email,password} = req.body;
    try {
        const hasedpassword = await bcrypt.hash(password,saltRounds);
        const users = new userModel({name,email,password:hasedpassword});
        users.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).send({errors:"registration failed",error});
    }
}
export const userController = {
    createUser,
}