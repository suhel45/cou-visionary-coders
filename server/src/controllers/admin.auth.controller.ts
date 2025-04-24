import { Request, Response } from "express";
import { CustomRequest } from "../interfaces/users.interface";

export const adminAuth = async (req:Request, res:Response) => {
    try {
        res.status(200).json({user: (req as CustomRequest).user});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}