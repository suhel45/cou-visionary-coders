import { Types } from 'mongoose';

export interface IReport {
  biodataNo: number;
  reason:
    | 'fake_profile'
    | 'inappropriate_content'
    | 'harassment'
    | 'scam'
    | 'other';
  reasonDetails: string;
  reporter: Types.ObjectId; 
  createdAt?: Date;
}
