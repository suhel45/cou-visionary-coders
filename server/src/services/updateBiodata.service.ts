import { PersonalAllDetailsModel } from '../models/PersonalAllDetails.Model';
import { IPersonalAllDetails } from '../interfaces/personalAllDetails.interface';

export const updateBiodata = async (
  updateData: Partial<IPersonalAllDetails>,
): Promise<IPersonalAllDetails | null> => {
  try {
    const id = updateData.users; // Assuming updateData contains the _id field
    const updatedDocument = await PersonalAllDetailsModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true },
    );

    return updatedDocument;
  } catch (error) {
    console.error('Error updating biodata:', error);
    throw new Error('Failed to update biodata');
  }
};