// tests/verification.service.test.ts
import { verificationService } from '../services/verification.service';
import { VerificationModel as OriginalVerificationModel } from '../models/Verification.Model';

jest.mock('../models/Verification.Model', () => {
  const VerificationModelMock = jest.fn().mockImplementation(() => ({
    save: jest.fn(),
  }));
  (VerificationModelMock as any).findOne = jest.fn();
  (VerificationModelMock as any).find = jest.fn();
  (VerificationModelMock as any).updateOne = jest.fn();
  return { VerificationModel: VerificationModelMock };
});

const { VerificationModel }: any = jest.requireMock('../models/Verification.Model');
// Ensure the mock does not conflict with the original import

describe('verificationService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('uploadIdCard', () => {
    it('should update existing verification record if found', async () => {
      const saveMock = jest.fn().mockResolvedValue({
        idCardImage: 'new-file-url',
        status: 'Pending',
      });

      (VerificationModel.findOne as jest.Mock).mockResolvedValue({
        idCardImage: 'old-file-url',
        status: 'Not Submitted',
        save: saveMock,
      });

      const result = await verificationService.uploadIdCard('user123', 'new-file-url');

      expect(VerificationModel.findOne).toHaveBeenCalledWith({ user: 'user123' });
      expect(saveMock).toHaveBeenCalled();
      expect(result).toEqual({
        idCardImage: 'new-file-url',
        status: 'Pending',
      });
    });

    it('should create new verification record if none exists', async () => {
      const saveMock = jest.fn().mockResolvedValue({
        user: 'user123',
        idCardImage: 'new-file-url',
        status: 'Pending',
      });

      (VerificationModel.findOne as jest.Mock).mockResolvedValue(null);

      // Mock the constructor behavior
      (VerificationModel as jest.Mock).mockImplementation(function () {
        return { save: saveMock };
      });

      const result = await verificationService.uploadIdCard('user123', 'new-file-url');

      expect(VerificationModel.findOne).toHaveBeenCalledWith({ user: 'user123' });
      expect(saveMock).toHaveBeenCalled();
      expect(result).toEqual({
        user: 'user123',
        idCardImage: 'new-file-url',
        status: 'Pending',
      });
    });
  });

  describe('checkVerificationStatus', () => {
    it('should return verification status if found', async () => {
      (VerificationModel.findOne as jest.Mock).mockResolvedValue({
        status: 'Pending',
      });

      const result = await verificationService.checkVerificationStatus('user123');

      expect(VerificationModel.findOne).toHaveBeenCalledWith({ user: 'user123' });
      expect(result).toBe('Pending');
    });

    it('should throw error if verification not found', async () => {
      (VerificationModel.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        verificationService.checkVerificationStatus('user123')
      ).rejects.toThrow('Verification not found');

      expect(VerificationModel.findOne).toHaveBeenCalledWith({ user: 'user123' });
    });
  });

  describe('approveVerification', () => {
    it('should approve verification if found', async () => {
      const saveMock = jest.fn().mockResolvedValue({
        status: 'Approved',
      });

      (VerificationModel.findOne as jest.Mock).mockResolvedValue({
        status: 'Pending',
        save: saveMock,
      });

      const result = await verificationService.approveVerification('user123');

      expect(VerificationModel.findOne).toHaveBeenCalledWith({ user: 'user123' });
      expect(saveMock).toHaveBeenCalled();
      expect(result).toEqual({ status: 'Approved' });
    });

    it('should throw error if verification not found', async () => {
      (VerificationModel.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        verificationService.approveVerification('user123')
      ).rejects.toThrow('Verification not found');
    });
  });

  describe('getPendingVerifications', () => {
    it('should return pending verifications', async () => {
      const pending = [{ user: 'user1' }, { user: 'user2' }];
      (VerificationModel.find as jest.Mock).mockResolvedValue(pending);

      const result = await verificationService.getPendingVerifications();

      expect(VerificationModel.find).toHaveBeenCalledWith({ status: 'Pending' });
      expect(result).toEqual(pending);
    });
  });

  describe('updateVerificationStatus', () => {
    it('should update verification status if record exists', async () => {
      (VerificationModel.updateOne as jest.Mock).mockResolvedValue({ modifiedCount: 1 });

      const result = await verificationService.updateVerificationStatus('user123', 'Approved');

      expect(VerificationModel.updateOne).toHaveBeenCalledWith(
        { user: 'user123' },
        { $set: { status: 'Approved' } }
      );
      expect(result).toEqual({ modifiedCount: 1 });
    });

    it('should throw error if verification record not found or unchanged', async () => {
      (VerificationModel.updateOne as jest.Mock).mockResolvedValue({ modifiedCount: 0 });

      await expect(
        verificationService.updateVerificationStatus('user123', 'Rejected')
      ).rejects.toThrow('Verification record not found or status unchanged');
    });
  });
});
