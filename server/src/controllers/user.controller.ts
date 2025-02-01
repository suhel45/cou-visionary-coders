import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import userModel from "../models/user.Model";
const saltRounds = 10;
const createUser = async(req:Request,res:Response)=>{
    const {name,email,password} = req.body;
    try {
        const hasedpassword = await bcrypt.hash(password,saltRounds);
        const users = new userModel({name,email,password:hasedpassword});
    } catch (error) {
        
    }
}