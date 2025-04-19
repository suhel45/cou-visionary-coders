import { ObjectId } from 'mongodb';

export interface IFavorite {
  user: ObjectId;
  biodata: ObjectId;
  createdAt: Date;
}
