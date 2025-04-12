import { Request, Response } from "express";
import { deleteBiodata } from "../services/deleteBiodata.service";
import logger from "../utils/logger.util";

interface CustomRequest extends Request {
  user: {
    id: string;
  };
}

export const deleteBiodataController = async (req:Request, res:Response) => {
  try {
    const biodataId = (req as CustomRequest).user.id;

    const deletedBiodata = await deleteBiodata(biodataId);

    res.status(200).json({
        success: true,
      message: 'Biodata deleted successfully',
      data: deletedBiodata,
    });
    
  } catch (error) {
    if (error instanceof Error) {
        logger.error('Error deleting biodata:', error.message);

      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
}