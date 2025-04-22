import { Request, Response } from 'express';
import { reportService } from '../services/report.service';
import logger from '../utils/logger.util';

interface CustomRequest extends Request {
  user: {
    id: string;
  };
}

const createReport = async (req: Request, res: Response) => {
  try {
    const userId = (req as CustomRequest).user.id;
    const { biodataNo, reason, reasonDetails } = req.body;

    const report = await reportService.createReport(
      userId,
      biodataNo,
      reason,
      reasonDetails,
    );
    res.status(201).json({
      success: true,
      message: 'Report created successfully',
      data: report,
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Error creating report:', error.message);
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
};

export const reportController = {
  createReport,
};
