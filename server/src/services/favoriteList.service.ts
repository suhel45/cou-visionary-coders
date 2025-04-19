// ...existing code...

import { FavoriteModel } from '../models/FavoriteList.model';
import { ObjectId } from 'mongodb';

const addToFavorites = async (userId: string, biodataId: string) => {
  const favorite = new FavoriteModel({
    user: new ObjectId(userId),
    biodata: new ObjectId(biodataId),
  });

  try {
    const result = await favorite.save();
    return result;
  } catch (error) {
    if ((error as any).code === 11000) {
      // Duplicate key error
      throw new Error('Biodata already in favorite list!');
    }
    throw error;
  }
};

const removeFromFavorites = async (userId: string, biodataId: string) => {
  const result = await FavoriteModel.findOneAndDelete({
    user: new ObjectId(userId),
    biodata: new ObjectId(biodataId),
  });

  if (!result) {
    throw new Error('Favorite list not found!');
  }
  return result;
};

const getFavoritesList = async (userId: string) => {
  const favorites = await FavoriteModel.find({
    user: new ObjectId(userId),
  })
    .populate('biodata')
    .sort({ createdAt: -1 })
    .lean();

  return favorites;
};

export const favoriteListService = {
  addToFavorites,
  removeFromFavorites,
  getFavoritesList,
};
