import { Request, Response } from 'express';
import { reportService } from '../services/report.service';
import logger from '../utils/logger.util';
import validator from 'validator';

interface CustomRequest extends Request {
  user: {
    id: string;
  };
}

// Helper sanitizers
const sanitizeNumber = (input: unknown): number => {
  const inputStr = String(input);
  const sanitized = validator.stripLow(validator.whitelist(inputStr, '0-9'));
  if (!validator.isInt(sanitized)) {
    throw new Error('Invalid biodata number');
  }
  return parseInt(sanitized, 10);
};

const sanitizeText = (input: unknown): string => {
  const inputStr = String(input).trim();
  const sanitized = validator.escape(inputStr);
  if (!sanitized || sanitized.length === 0) {
    throw new Error('Invalid or empty input string');
  }
  return sanitized;
};

const createReport = async (req: Request, res: Response) => {
  try {
    const userId = sanitizeText((req as CustomRequest).user.id);
    const biodataNo = sanitizeNumber(req.body.biodataNo);
    const reason = sanitizeText(req.body.reason);
    const reasonDetails = sanitizeText(req.body.reasonDetails);

    const report = await reportService.createReport(
      userId,
      biodataNo,
      reason,
      reasonDetails
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

const getAllReports = async (req: Request, res: Response) => {
  try {
    const reports = await reportService.getAllReports();
    res.status(200).json({
      success: true,
      message: 'Reports retrieved successfully',
      data: reports,
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Error retrieving reports:', error.message);
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
  getAllReports,
};
