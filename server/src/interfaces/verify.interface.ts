// interfaces/verification.interface.ts
import { Types } from 'mongoose';

export interface IVerification {
  user: Types.ObjectId;
  idCardImage: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  rejectionReason?: string;
  approvedBy?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
