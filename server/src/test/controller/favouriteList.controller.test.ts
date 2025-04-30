import { favoriteListController } from '../../controllers/favoriteList.controller';
import { favoriteListService } from '../../services/favoriteList.service';
import logger from '../../utils/logger.util';
import { Request, Response } from 'express';

// Mock dependencies
jest.mock('../../services/favoriteList.service');
jest.mock('../../utils/logger.util');

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('favoriteListController', () => {
  let req: Partial<Request>;
  let res: Response;

  beforeEach(() => {
    req = {
      user: { id: 'user123' },
      body: {},
      params: {},
    } as any; // Type cast
    res = mockResponse();
    jest.clearAllMocks();
  });

  describe('addToFavorites', () => {
    it('should add biodata to favorites successfully', async () => {
      req.body = { biodataId: 'biodata123' };
      const mockResult = { id: 'fav1', biodataId: 'biodata123', userId: 'user123' };
      (favoriteListService.addToFavorites as jest.Mock).mockResolvedValueOnce(mockResult);

      await favoriteListController.addToFavorites(req as Request, res);

      expect(favoriteListService.addToFavorites).toHaveBeenCalledWith('user123', 'biodata123');
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Added to favorites successfully',
        data: mockResult,
      });
    });

    it('should handle error when adding to favorites', async () => {
      const mockError = new Error('Failed to add to favorites');
      (favoriteListService.addToFavorites as jest.Mock).mockRejectedValueOnce(mockError);

      await favoriteListController.addToFavorites(req as Request, res);

      expect(logger.error).toHaveBeenCalledWith('Error add favoriteList:', mockError.message);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: mockError.message,
      });
    });
  });

  describe('removeFromFavorites', () => {
    it('should remove biodata from favorites successfully', async () => {
      req.params = { biodataId: 'biodata123' };
      (favoriteListService.removeFromFavorites as jest.Mock).mockResolvedValueOnce(undefined);

      await favoriteListController.removeFromFavorites(req as Request, res);

      expect(favoriteListService.removeFromFavorites).toHaveBeenCalledWith('user123', 'biodata123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Removed favorite list successfully',
      });
    });

    it('should handle error when removing from favorites', async () => {
      const mockError = new Error('Failed to remove from favorites');
      (favoriteListService.removeFromFavorites as jest.Mock).mockRejectedValueOnce(mockError);

      await favoriteListController.removeFromFavorites(req as Request, res);

      expect(logger.error).toHaveBeenCalledWith('Error remove favoriteList:', mockError.message);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: mockError.message,
      });
    });
  });

  describe('getFavoritesList', () => {
    it('should get the favorites list successfully', async () => {
      const mockFavorites = [
        { biodata: { id: 'biodata1', name: 'John Doe' } },
        { biodata: { id: 'biodata2', name: 'Jane Smith' } },
      ];
      (favoriteListService.getFavoritesList as jest.Mock).mockResolvedValueOnce(mockFavorites);

      await favoriteListController.getFavoritesList(req as Request, res);

      expect(favoriteListService.getFavoritesList).toHaveBeenCalledWith('user123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: [
          { id: 'biodata1', name: 'John Doe' },
          { id: 'biodata2', name: 'Jane Smith' },
        ],
      });
    });

    it('should handle error when getting favorites list', async () => {
      const mockError = new Error('Failed to get favorites');
      (favoriteListService.getFavoritesList as jest.Mock).mockRejectedValueOnce(mockError);

      await favoriteListController.getFavoritesList(req as Request, res);

      expect(logger.error).toHaveBeenCalledWith('Error fetching favoriteList:', mockError.message);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: mockError.message,
      });
    });
  });
});
