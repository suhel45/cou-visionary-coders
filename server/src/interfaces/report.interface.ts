export interface IReport {
    biodataNo: number;
    reason: 'fake_profile' | 'inappropriate_content' | 'harassment' | 'scam' | 'other';
    reasonDetails: string;
    reporter: string; // ObjectId as string
    createdAt?: Date;
  }