import { personalDetailsController } from '../../controllers/personalAllDetails.controller';
import { personalDetailsService } from '../../services/personalAllDetails.service';
import { Request, Response } from 'express';

// Mock the service
jest.mock('../../services/personalAllDetails.service');

describe('personalDetailsController', () => {
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

  describe('Biodata', () => {
    it('should create biodata successfully', async () => {
      const mockResult = { id: '1', name: 'Test Biodata' };
      (personalDetailsService.createBiodata as jest.Mock).mockResolvedValue(
        mockResult,
      );

      req = {
        body: { name: 'Test Biodata' },
        user: { id: 'user-1' },
      } as any;

      await personalDetailsController.Biodata(req as Request, res as Response);

      expect(personalDetailsService.createBiodata).toHaveBeenCalledWith({
        name: 'Test Biodata',
        users: 'user-1',
      });
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        message: 'Biodata created successfully',
        data: mockResult,
      });
    });

    it('should handle "Biodata already exists!" error', async () => {
      const error = new Error('Biodata already exists!');
      (personalDetailsService.createBiodata as jest.Mock).mockRejectedValue(
        error,
      );

      req = {
        body: { name: 'Duplicate Biodata' },
        user: { id: 'user-2' },
      } as any;

      await personalDetailsController.Biodata(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        message: 'Biodata already exists!',
      });
    });
  });

  describe('GetBiodata', () => {
    it('should get biodata successfully', async () => {
      const mockBiodata = { id: '1', name: 'Test User' };
      (personalDetailsService.getBiodata as jest.Mock).mockResolvedValue(
        mockBiodata,
      );

      req = { user: { id: 'user-1' } } as any;

      await personalDetailsController.GetBiodata(
        req as Request,
        res as Response,
      );

      expect(personalDetailsService.getBiodata).toHaveBeenCalledWith('user-1');
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        data: mockBiodata,
      });
    });

    it('should handle error on GetBiodata', async () => {
      (personalDetailsService.getBiodata as jest.Mock).mockRejectedValue(
        new Error('DB Error'),
      );

      req = { user: { id: 'user-1' } } as any;

      await personalDetailsController.GetBiodata(
        req as Request,
        res as Response,
      );

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        message: 'Failed to fetch data',
      });
    });
  });

  describe('GetPublicBiodataDetails', () => {
    it('should get public biodata details successfully', async () => {
      const mockDetails = { id: 'public-1', name: 'Public User' };
      (
        personalDetailsService.getPublicBiodataDetails as jest.Mock
      ).mockResolvedValue(mockDetails);

      req = { params: { id: 'public-1' } } as any;

      await personalDetailsController.GetPublicBiodataDetails(
        req as Request,
        res as Response,
      );

      expect(
        personalDetailsService.getPublicBiodataDetails,
      ).toHaveBeenCalledWith('public-1');
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        data: mockDetails,
      });
    });

    it('should handle error on GetPublicBiodataDetails', async () => {
      (
        personalDetailsService.getPublicBiodataDetails as jest.Mock
      ).mockRejectedValue(new Error('Not found'));

      req = { params: { id: 'public-1' } } as any;

      await personalDetailsController.GetPublicBiodataDetails(
        req as Request,
        res as Response,
      );

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        message: 'Failed to fetch data',
      });
    });
  });

  describe('getBiodataStatistics', () => {
    it('should get biodata statistics successfully', async () => {
      const mockStats = { totalUsers: 100 };
      (personalDetailsService.getBiodataStats as jest.Mock).mockResolvedValue(
        mockStats,
      );

      req = {} as any;

      await personalDetailsController.getBiodataStatistics(
        req as Request,
        res as Response,
      );

      expect(personalDetailsService.getBiodataStats).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        data: mockStats,
        message: 'Biodata statistics retrieved successfully',
      });
    });

    it('should handle error on getBiodataStatistics', async () => {
      (personalDetailsService.getBiodataStats as jest.Mock).mockRejectedValue(
        new Error('Stats error'),
      );

      req = {} as any;

      await personalDetailsController.getBiodataStatistics(
        req as Request,
        res as Response,
      );

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        message: 'Failed to retrieve biodata statistics',
      });
    });
  });
});
