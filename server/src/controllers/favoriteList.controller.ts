import { Request, Response } from 'express';
import { favoriteListService } from '../services/favoriteList.service';
import logger from '../utils/logger.util';

interface CustomRequest extends Request {
  user: {
    id: string;
  };
}

const addToFavorites = async (req: Request, res: Response) => {
  try {
    const userId = (req as CustomRequest).user.id;
    const { biodataId } = req.body;

    const result = await favoriteListService.addToFavorites(userId, biodataId);
    res.status(201).json({
      success: true,
      message: 'Added to favorites successfully',
      data: result,
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
};

const removeFromFavorites = async (req: Request, res: Response) => {
  try {
    const userId = (req as CustomRequest).user.id;
    const { biodataId } = req.params;

    await favoriteListService.removeFromFavorites(userId, biodataId);
    res.status(200).json({
      success: true,
      message: 'Removed favorite list successfully',
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
};

const getFavoritesList = async (req: Request, res: Response) => {
  try {
    const userId = (req as CustomRequest).user.id;
    const favorites = await favoriteListService.getFavoritesList(userId);

    // Map through favorites to get just the biodata
    const transformedData = favorites.map((favorite) => favorite.biodata);

    res.status(200).json({
      success: true,
      data: transformedData,
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
};

export const favoriteListController = {
  addToFavorites,
  removeFromFavorites,
  getFavoritesList,
};
