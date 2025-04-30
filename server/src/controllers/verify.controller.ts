// controllers/verify.controller.ts
import { Request, Response } from 'express';
import { verificationService } from '../services/verification.service';

interface CustomRequest extends Request {
  user: {
    id: string;
  };
  file?: Express.Multer.File;
}

export const uploadIDCard = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as CustomRequest).user.id;
    const file = req.file;
    console.log(userId, file);
    if (!file || !userId) {
      res.status(400).json({ message: 'Missing file or user' });
      return;
    }

    await verificationService.uploadIdCard(userId, file.path);

    res.status(200).json({ message: 'Verification submitted' });
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? 'Internal Server Error' });
  }
};
export const checkVerificationStatus = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as CustomRequest).user.id;

    if (!userId) {
      res.status(400).json({ message: 'Missing userId parameter' });
      return;
    }

    const status = await verificationService.checkVerificationStatus(userId);
    res.status(200).json({ status });
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? 'Internal Server Error' });
  }
};
export const getAllPendingVerifications = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const pendingVerifications =
      await verificationService.getPendingVerifications();
    res.status(200).json(pendingVerifications);
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? 'Internal Server Error' });
  }
};

export const approveVerification = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    await verificationService.updateVerificationStatus(userId, 'Approved');
    res.status(200).json({ message: `User ${userId} approved.` });
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? 'Internal Server Error' });
  }
};

export const rejectVerification = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    await verificationService.updateVerificationStatus(userId, 'Rejected');
    res.status(200).json({ message: `User ${userId} rejected.` });
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? 'Internal Server Error' });
  }
};
