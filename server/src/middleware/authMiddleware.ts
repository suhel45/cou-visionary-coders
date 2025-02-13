import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { resolve } from "path";

dotenv.config();

const verifyToken = async(req:Request, res:Response, next:NextFunction) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "Access denied" });

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) return res.status(500).json({ message: "Internal server error" });

    const decoded = await new Promise((resolve, reject) => {
        jwt.verify(token,secretKey, (err, decoded) => {
            if (err) return reject(err);
            resolve(decoded);
        })
    })
}