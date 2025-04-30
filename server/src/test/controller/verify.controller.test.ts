import {
  uploadIDCard,
  checkVerificationStatus,
  getAllPendingVerifications,
  approveVerification,
  rejectVerification,
} from '../../controllers/verify.controller';
import { verificationService } from '../../services/verification.service';
import { Request, Response } from 'express';

interface CustomRequest extends Request {
  user?: { id: string };
}

// Mock the verificationService
jest.mock('../../services/verification.service');

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('verify.controller', () => {
  let req: Partial<Request>;
  let res: Response;

  beforeEach(() => {
    req = {};
    res = mockResponse();
    jest.clearAllMocks();
    (req as CustomRequest).user = { id: '' };
  });

  describe('uploadIDCard', () => {
    it('should return 400 if missing file or user', async () => {
      (req as CustomRequest).user = { id: '' };
      req.file = undefined;

      await uploadIDCard(req as Request, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Missing file or user',
      });
    });

    it('should call service and return 200 on success', async () => {
      (req as CustomRequest).user = { id: 'user123' };
      req.file = { path: 'path/to/file' } as Express.Multer.File;

      await uploadIDCard(req as Request, res);

      expect(verificationService.uploadIdCard).toHaveBeenCalledWith(
        'user123',
        'path/to/file',
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Verification submitted',
      });
    });

    it('should handle errors', async () => {
      (verificationService.uploadIdCard as jest.Mock).mockRejectedValueOnce(
        new Error('Upload error'),
      );

      (req as CustomRequest).user = { id: 'user123' };
      req.file = { path: 'path/to/file' } as Express.Multer.File;

      await uploadIDCard(req as Request, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Upload error' });
    });
  });

  describe('checkVerificationStatus', () => {
    it('should return 400 if missing userId', async () => {
      (req as CustomRequest).user = { id: '' };

      await checkVerificationStatus(req as Request, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Missing userId parameter',
      });
    });

    it('should return status on success', async () => {
      (
        verificationService.checkVerificationStatus as jest.Mock
      ).mockResolvedValueOnce('Approved');

      (req as CustomRequest).user = { id: 'user123' };

      await checkVerificationStatus(req as Request, res);

      expect(verificationService.checkVerificationStatus).toHaveBeenCalledWith(
        'user123',
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ status: 'Approved' });
    });

    it('should handle errors', async () => {
      (
        verificationService.checkVerificationStatus as jest.Mock
      ).mockRejectedValueOnce(new Error('Status error'));

      (req as CustomRequest).user = { id: 'user123' };

      await checkVerificationStatus(req as Request, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Status error' });
    });
  });

  describe('getAllPendingVerifications', () => {
    it('should return pending verifications', async () => {
      const mockData = [{ id: '1' }, { id: '2' }];
      (
        verificationService.getPendingVerifications as jest.Mock
      ).mockResolvedValueOnce(mockData);

      await getAllPendingVerifications(req as Request, res);

      expect(verificationService.getPendingVerifications).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it('should handle errors', async () => {
      (
        verificationService.getPendingVerifications as jest.Mock
      ).mockRejectedValueOnce(new Error('Pending error'));

      await getAllPendingVerifications(req as Request, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Pending error' });
    });
  });

  describe('approveVerification', () => {
    it('should return 400 if missing userId', async () => {
      req.params = { userId: '' };

      await approveVerification(req as Request, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'User ID is required' });
    });

    it('should approve user successfully', async () => {
      req.params = { userId: 'user123' };

      await approveVerification(req as Request, res);

      expect(verificationService.updateVerificationStatus).toHaveBeenCalledWith(
        'user123',
        'Approved',
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User user123 approved.',
      });
    });

    it('should handle errors', async () => {
      (
        verificationService.updateVerificationStatus as jest.Mock
      ).mockRejectedValueOnce(new Error('Approve error'));
      req.params = { userId: 'user123' };

      await approveVerification(req as Request, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Approve error' });
    });
  });

  describe('rejectVerification', () => {
    it('should return 400 if missing userId', async () => {
      req.params = { userId: '' };

      await rejectVerification(req as Request, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'User ID is required' });
    });

    it('should reject user successfully', async () => {
      req.params = { userId: 'user123' };

      await rejectVerification(req as Request, res);

      expect(verificationService.updateVerificationStatus).toHaveBeenCalledWith(
        'user123',
        'Rejected',
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User user123 rejected.',
      });
    });

    it('should handle errors', async () => {
      (
        verificationService.updateVerificationStatus as jest.Mock
      ).mockRejectedValueOnce(new Error('Reject error'));
      req.params = { userId: 'user123' };

      await rejectVerification(req as Request, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Reject error' });
    });
  });
});
