import { VerificationModel } from '../models/Verification.Model';

const uploadIdCard = async (userId: string, fileUrl: string) => {
  const existing = await VerificationModel.findOne({ user: userId });

  if (existing) {
    existing.idCardImage = fileUrl;
    existing.status = 'Pending';
    return await existing.save();
  }

  const newVerification = new VerificationModel({
    user: userId,
    idCardImage: fileUrl,
    status: 'Pending',
  });
  return await newVerification.save();
};

const checkVerificationStatus = async (userId: string) => {
  const verification = await VerificationModel.findOne({ user: userId });
  if (!verification) {
    throw new Error('Verification not found');
  }
  return verification.status;
};

const approveVerification = async (userId: string) => {
  const verification = await VerificationModel.findOne({ user: userId });
  if (!verification) {
    throw new Error('Verification not found');
  }
  verification.status = 'Approved';
  return await verification.save();
};
const getPendingVerifications = async () => {
  // Return list of users with status === 'pending'
  return await VerificationModel.find({ status: 'Pending' });
};

const updateVerificationStatus = async (userId: string, status: 'Approved' | 'Rejected') => {
  // Convert string ID to ObjectId if needed
  const result = await VerificationModel.updateOne(
    { user: userId }, 
    { $set: { status } }
  );
  
  if (result.modifiedCount === 0) {
    throw new Error('Verification record not found or status unchanged');
  }
  
  return result;
};


export const verificationService = {
  uploadIdCard,
  checkVerificationStatus,
  approveVerification,
  getPendingVerifications,
  updateVerificationStatus
};
