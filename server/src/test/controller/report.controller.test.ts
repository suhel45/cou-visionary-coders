import { reportController } from '../../controllers/report.controller';
import { reportService } from '../../services/report.service';
import logger from '../../utils/logger.util';

import { Request, Response } from 'express';

// Mock reportService and logger
jest.mock('../../services/report.service');
jest.mock('../../utils/logger.util');

describe('Report Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis(); 
    jsonMock = jest.fn();

    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createReport', () => {
    it('should create a report successfully', async () => {
      const mockReport = { id: '123', biodataNo: '456', reason: 'Spam' };
      (reportService.createReport as jest.Mock).mockResolvedValue(mockReport);

      req = {
        body: {
          biodataNo: '456',
          reason: 'Spam',
          reasonDetails: 'Posting spam links',
        },
        user: {
          id: 'user-123',
        },
      } as any;

      await reportController.createReport(req as Request, res as Response);

      expect(reportService.createReport).toHaveBeenCalledWith(
        'user-123',
        '456',
        'Spam',
        'Posting spam links'
      );
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        message: 'Report created successfully',
        data: mockReport,
      });
    });

    it('should handle service error (Error instance)', async () => {
      const error = new Error('Failed to create report');
      (reportService.createReport as jest.Mock).mockRejectedValue(error);

      req = {
        body: {},
        user: {
          id: 'user-123',
        },
      } as any;

      await reportController.createReport(req as Request, res as Response);

      expect(logger.error).toHaveBeenCalledWith('Error creating report:', 'Failed to create report');
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        message: 'Failed to create report',
      });
    });

    it('should handle unknown error', async () => {
      (reportService.createReport as jest.Mock).mockRejectedValue('Unknown error');

      req = {
        body: {},
        user: {
          id: 'user-123',
        },
      } as any;

      await reportController.createReport(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        message: 'Internal server error',
      });
    });
  });

  describe('getAllReports', () => {
    it('should get all reports successfully', async () => {
      const mockReports = [
        { id: '1', biodataNo: '100', reason: 'Fake profile' },
        { id: '2', biodataNo: '101', reason: 'Spam' },
      ];
      (reportService.getAllReports as jest.Mock).mockResolvedValue(mockReports);

      req = {};

      await reportController.getAllReports(req as Request, res as Response);

      expect(reportService.getAllReports).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        message: 'Reports retrieved successfully',
        data: mockReports,
      });
    });

    it('should handle service error (Error instance)', async () => {
      const error = new Error('Database error');
      (reportService.getAllReports as jest.Mock).mockRejectedValue(error);

      req = {};

      await reportController.getAllReports(req as Request, res as Response);

      expect(logger.error).toHaveBeenCalledWith('Error retrieving reports:', 'Database error');
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        message: 'Database error',
      });
    });

    it('should handle unknown error', async () => {
      (reportService.getAllReports as jest.Mock).mockRejectedValue('Unknown error');

      req = {};

      await reportController.getAllReports(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        message: 'Internal server error',
      });
    });
  });
});
