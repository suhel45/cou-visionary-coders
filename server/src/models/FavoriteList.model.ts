import { Schema, model } from 'mongoose';
import { IFavorite } from '../interfaces/favoriteList.interface';

const favoriteSchema = new Schema<IFavorite>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  biodata: {
    type: Schema.Types.ObjectId,
    ref: 'PersonalAllDetails',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure a user can't favorite the same biodata multiple times
favoriteSchema.index({ user: 1, biodata: 1 }, { unique: true });

export const FavoriteModel = model<IFavorite>('Favorite', favoriteSchema);