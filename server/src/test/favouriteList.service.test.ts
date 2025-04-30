import { favoriteListService } from '../services/favoriteList.service';
import { FavoriteModel } from '../models/FavoriteList.model';
import { ObjectId } from 'mongodb';

// Mocking
jest.mock('../models/FavoriteList.model');
const MockFavoriteModel = FavoriteModel as jest.Mocked<typeof FavoriteModel>;

// Dummy valid ObjectIds
const userId = new ObjectId().toHexString();
const biodataId = new ObjectId().toHexString();

describe('favoriteListService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('addToFavorites', () => {
    it('should add a new favorite successfully', async () => {
      const mockSave = jest.fn().mockResolvedValue({
        _id: new ObjectId().toHexString(),
        user: userId,
        biodata: biodataId,
      });

      MockFavoriteModel.prototype.save = mockSave as any;

      const result = await favoriteListService.addToFavorites(
        userId,
        biodataId,
      );

      expect(result).toEqual(
        expect.objectContaining({
          user: userId,
          biodata: biodataId,
        }),
      );
      expect(mockSave).toHaveBeenCalled();
    });

    it('should throw an error if trying to add duplicate favorite', async () => {
      const error = { code: 11000 };
      const mockSave = jest.fn().mockRejectedValue(error);

      MockFavoriteModel.prototype.save = mockSave as any;

      await expect(
        favoriteListService.addToFavorites(userId, biodataId),
      ).rejects.toThrow('Biodata already in favorite list!');

      expect(mockSave).toHaveBeenCalled();
    });

    it('should rethrow other errors', async () => {
      const error = new Error('Something else went wrong');
      const mockSave = jest.fn().mockRejectedValue(error);

      MockFavoriteModel.prototype.save = mockSave as any;

      await expect(
        favoriteListService.addToFavorites(userId, biodataId),
      ).rejects.toThrow('Something else went wrong');

      expect(mockSave).toHaveBeenCalled();
    });
  });

  describe('removeFromFavorites', () => {
    it('should remove a favorite successfully', async () => {
      (MockFavoriteModel.findOneAndDelete as jest.Mock).mockResolvedValue({
        _id: new ObjectId().toHexString(),
        user: userId,
        biodata: biodataId,
      });

      const result = await favoriteListService.removeFromFavorites(
        userId,
        biodataId,
      );

      expect(result).toEqual(
        expect.objectContaining({
          user: userId,
          biodata: biodataId,
        }),
      );
      expect(MockFavoriteModel.findOneAndDelete).toHaveBeenCalledWith({
        user: expect.any(ObjectId),
        biodata: expect.any(ObjectId),
      });
    });

    it('should throw error if favorite not found', async () => {
      (MockFavoriteModel.findOneAndDelete as jest.Mock).mockResolvedValue(null);

      await expect(
        favoriteListService.removeFromFavorites(userId, biodataId),
      ).rejects.toThrow('Favorite list not found!');

      expect(MockFavoriteModel.findOneAndDelete).toHaveBeenCalled();
    });
  });

  describe('getFavoritesList', () => {
    it('should return list of favorites for a user', async () => {
      const mockFavorites = [
        {
          _id: new ObjectId().toHexString(),
          user: userId,
          biodata: biodataId,
          createdAt: new Date(),
        },
      ];

      (MockFavoriteModel.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockFavorites),
      });

      const result = await favoriteListService.getFavoritesList(userId);

      expect(result).toEqual(mockFavorites);
      expect(MockFavoriteModel.find).toHaveBeenCalledWith({
        user: expect.any(ObjectId),
      });
    });
  });
});
