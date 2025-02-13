import { Request, Response, NextFunction } from "express";

const verifyToken = (req:Request, res:Response, next:NextFunction) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Access denied" });
}