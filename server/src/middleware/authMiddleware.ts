import {  Response, NextFunction, Request } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IDecodedUser } from "../interfaces/users.interface";

dotenv.config()

export const verifyToken = async(req: Request, res:Response, next:NextFunction):Promise<void> => {
    const token = req.cookies.token;
    if (!token) {
     res.status(401).json({ message: "Access denied" });
     return;
    } 
        

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
         res.status(500).json({ message: "Internal server error" });
         return;
    }
 try {
    const decoded = await jwt.verify(token, secretKey) as IDecodedUser;
    req.user = decoded as IDecodedUser;
    next();
 } catch(error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token"});
 }
}