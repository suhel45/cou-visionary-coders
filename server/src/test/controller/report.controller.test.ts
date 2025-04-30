import { reportController } from '../../controllers/report.controller';
import { reportService } from '../../services/report.service';
import logger from '../../utils/logger.util';
import { Request, Response } from 'express';


jest.mock('../../services/report.service');
jest.mock('../../utils/logger.util');

interface CustomRequest extends Request {
  user?: { id: string };
}

describe('reportController', () => {
  let req: Partial<CustomRequest>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: {},
      user: { id: 'user123' },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  describe('createReport', () => {
    it('should return 201 if report is created successfully', async () => {
      req.body = {
        biodataNo: '12345',
        reason: 'Spam',
        reasonDetails: 'Sending spam messages',
      };

      (reportService.createReport as jest.Mock).mockResolvedValue({
        id: 'report1',
        biodataNo: 12345,
      });

      await reportController.createReport(req as Request, res as Response);

      expect(reportService.createReport).toHaveBeenCalledWith(
        'user123',
        12345,
        'Spam',
        'Sending spam messages'
      );

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Report created successfully',
        data: {
          id: 'report1',
          biodataNo: 12345,
        },
      });
    });

    it('should handle known errors with 400 response', async () => {
      req.body = {
        biodataNo: 'abc', // invalid number
        reason: 'Spam',
        reasonDetails: 'Details',
      };

      await reportController.createReport(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: expect.any(String),
        })
      );
    });

    it('should handle unknown errors with 500 response', async () => {
      req.body = {
        biodataNo: '12345',
        reason: 'Test',
        reasonDetails: 'Details',
      };

      (reportService.createReport as jest.Mock).mockImplementation(() => {
        throw 'Unknown';
      });

      await reportController.createReport(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Internal server error',
      });
    });
  });

  describe('getAllReports', () => {
    it('should return 200 with all reports', async () => {
      const mockReports = [{ id: 'report1' }, { id: 'report2' }];

      (reportService.getAllReports as jest.Mock).mockResolvedValue(mockReports);

      await reportController.getAllReports(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Reports retrieved successfully',
        data: mockReports,
      });
    });

    it('should return 400 on known error', async () => {
      const knownError = new Error('Database error');
      (reportService.getAllReports as jest.Mock).mockRejectedValue(knownError);

      await reportController.getAllReports(req as Request, res as Response);

      expect(logger.error).toHaveBeenCalledWith(
        'Error retrieving reports:',
        'Database error'
      );

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Database error',
      });
    });

    it('should return 500 on unknown error', async () => {
      (reportService.getAllReports as jest.Mock).mockRejectedValue('Unknown');

      await reportController.getAllReports(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Internal server error',
      });
    });
  });
});
