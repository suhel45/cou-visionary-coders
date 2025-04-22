import { Request, Response } from 'express';
import { supportService } from '../services/support.service';
import logger from '../utils/logger.util';

interface CustomRequest extends Request {
  user: {
    id: string;
  };
}

const addToSupport = async (req: Request, res: Response) => {
  try {
    const userId = (req as CustomRequest).user.id;
    const { message } = req.body;

    const supportRequest = await supportService.addToSupport(userId, message);

    res.status(200).json({
      success: true,
      message: 'Support request submitted successfully',
      data: supportRequest,
    });
  } catch (error) {
    logger.error('Error adding to support:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to Support request',
    });
  }
};

export const supportController = {
  addToSupport,
};
