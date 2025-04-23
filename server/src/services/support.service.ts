import { SupportModel } from '../models/support.model';

const addToSupport = async (userId: string, message: string) => {
  // Check for duplicate support request
  const existing = await SupportModel.findOne({ user: userId, message });
  if (existing) {
    throw new Error(
      'Duplicate support request: same message already submitted.',
    );
  }

  const newSupportRequest = new SupportModel({
    user: userId,
    message,
  });
  const support = await newSupportRequest.save();
  return support;
};

const getSupportList = async () => {
  const supportList = await SupportModel.find()
    .populate('user', 'username email')
    .sort({ createdAt: -1 })
    .exec();
  return supportList;
};

export const supportService = {
  addToSupport,
  getSupportList,
};
