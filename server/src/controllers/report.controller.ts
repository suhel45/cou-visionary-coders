import { Request, Response } from "express";

interface CustomRequest extends Request {
    user: {
      id: string;
    };
  }
  
const createReport = async(req: Request, res: Response) => {
    try {
        const userId = (req as CustomRequest).user.id;
        const { biodataNo, reason, reasonDetails } = req.body;

    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}