import { Request, Response } from 'express';
import { updateBiodata } from '../services/updateBiodata.service';
import logger from '../utils/logger.util';

interface CustomRequest extends Request {
  user: {
    id: string;
  };
}

export const updateBiodataController = async (req: Request, res: Response) => {
  const userId = (req as CustomRequest).user.id;
  req.body.users = userId;
  const updateData = req.body;

  try {
    const updatedDocument = await updateBiodata(updateData);

    res.status(200).json({
      success: true,
      message: 'Biodata updated successfully',
      data: updatedDocument,
    });

  } catch (error) {
    
    if (error instanceof Error) {
      logger.error('Error updating biodata:', error.message);

      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
};