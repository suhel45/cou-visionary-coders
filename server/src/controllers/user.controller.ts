import { Request, Response } from "express";
import bcrypt from 'bcrypt';
const saltRounds = 10;
const createUser = async(req:Request,res:Response)=>{
    const {email,password} = req.body;
    try {
        const hasedpassword = await bcrypt.hash(password,saltRounds);
        
    } catch (error) {
        
    }
}