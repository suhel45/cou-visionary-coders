import { Request, Response } from 'express';
import { personalDetailsService } from '../services/personalAllDetails.service';
import { favoriteListService } from '../services/favoriteList.service';
import logger from '../utils/logger.util';

interface CustomRequest extends Request {
  user: {
    id: string;
  };
}

export const favoriteController = {
  async addToFavorites(req: Request, res: Response) {
    try {
        const userId = (req as CustomRequest).user.id;
      const { biodataId } = req.body;
      
      const result = await favoriteListService.addToFavorites(userId, biodataId);
      res.status(201).json({
        success: true,
        message: 'Added to favorites successfully',
        data: result
      });
    } catch (error) {
        if (error instanceof Error) {
            logger.error('Error add favoriteList:', error.message);
            res.status(400).json({
              success: false,
              message: error.message,
            });
          }
    }
  },

  async removeFromFavorites(req: Request, res: Response) {
    try {
        const userId = (req as CustomRequest).user.id;
      const { biodataId } = req.params;
      
      await favoriteListService.removeFromFavorites(userId, biodataId);
      res.status(200).json({
        success: true,
        message: 'Removed from favorites successfully'
      });
    } catch (error) {
        if (error instanceof Error) {
            logger.error('Error remove favoriteList:', error.message);
            res.status(400).json({
              success: false,
              message: error.message,
            });
          }
    }
  },

  async getFavoritesList(req: Request, res: Response) {
    try {
        const userId = (req as CustomRequest).user.id;
      const favorites = await favoriteListService.getFavoritesList(userId);
      
      res.status(200).json({
        success: true,
        data: favorites
      });
    } catch (error) {
        if (error instanceof Error) {
            logger.error('Error fetching favoriteList:', error.message);
            res.status(400).json({
              success: false,
              message: error.message,
            });
          }
    }
  }
};