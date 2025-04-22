import { Request, Response } from "express";

interface CustomRequest extends Request {
    user: {
      id: string;
    };
  }
  
const addToSupport = async (req:Request, res:Response) => {
  try {
    const userId = (req as CustomRequest).user.id;
    const { message } = req.body;

    res.status(200).json({ message: 'Support request submitted successfully' });
  } catch (error) {
    console.error('Error adding to support:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}