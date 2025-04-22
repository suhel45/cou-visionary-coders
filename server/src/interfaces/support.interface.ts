import { Types } from 'mongoose';

export interface ISupport {
  _id?: Types.ObjectId;
  message: string;
  user: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
