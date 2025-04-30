import { supportController } from '../../controllers/support.controller';
import { supportService } from '../../services/support.service';
import logger from '../../utils/logger.util';
import { Request, Response } from 'express';

// Mock dependencies
jest.mock('../../services/support.service');
jest.mock('../../utils/logger.util');

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('supportController', () => {
  let req: Partial<Request>;
  let res: Response;

  beforeEach(() => {
    req = {
      user: { id: 'user123' },
      body: {},
    } as any;
    res = mockResponse();
    jest.clearAllMocks();
  });

  describe('addToSupport', () => {
    it('should submit support request successfully', async () => {
      req.body = { message: 'Help needed!' };
      const mockSupportRequest = {
        id: 'support123',
        userId: 'user123',
        message: 'Help needed!',
      };
      (supportService.addToSupport as jest.Mock).mockResolvedValueOnce(
        mockSupportRequest,
      );

      await supportController.addToSupport(req as Request, res);

      expect(supportService.addToSupport).toHaveBeenCalledWith(
        'user123',
        'Help needed!',
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Support request submitted successfully',
        data: mockSupportRequest,
      });
    });

    it('should handle error when submitting support request', async () => {
      const mockError = new Error('Database error');
      (supportService.addToSupport as jest.Mock).mockRejectedValueOnce(
        mockError,
      );

      await supportController.addToSupport(req as Request, res);

      expect(logger.error).toHaveBeenCalledWith(
        'Error adding to support:',
        mockError,
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Failed to submit support request',
      });
    });
  });

  describe('getSupportList', () => {
    it('should retrieve support list successfully', async () => {
      const mockSupportList = [
        { id: 'support1', message: 'Need help with password reset' },
        { id: 'support2', message: 'Issue with login' },
      ];
      (supportService.getSupportList as jest.Mock).mockResolvedValueOnce(
        mockSupportList,
      );

      await supportController.getSupportList(req as Request, res);

      expect(supportService.getSupportList).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Support list retrieved successfully',
        data: mockSupportList,
      });
    });

    it('should handle error when retrieving support list', async () => {
      const mockError = new Error('Database fetch error');
      (supportService.getSupportList as jest.Mock).mockRejectedValueOnce(
        mockError,
      );

      await supportController.getSupportList(req as Request, res);

      expect(logger.error).toHaveBeenCalledWith(
        'Error retrieving support list:',
        mockError,
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Failed to retrieve support list',
      });
    });
  });
});
