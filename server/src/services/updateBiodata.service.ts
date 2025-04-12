import { PersonalAllDetailsModel } from '../models/PersonalAllDetails.Model';
import { IPersonalAllDetails } from '../interfaces/personalAllDetails.interface';

export const updateBiodata = async (
  updateData: Partial<IPersonalAllDetails>,
): Promise<IPersonalAllDetails | null> => {
    const id = updateData.users; // extract uses unique id

     // Find the existing biodata for the user
  const existingBiodata = await PersonalAllDetailsModel.findOne({
    users: { $eq: id },
  });
  
  // If no biodata exists, throw an error
  if (!existingBiodata) {
    throw new Error('Biodata not found for this user!');
  }

  // Update only the fields provided in updateData
  // We don't allow updating the biodataNo or users fields
  const updatedBiodata = await PersonalAllDetailsModel.findOneAndUpdate(
    { users: { $eq: id } },
    { 
      $set: {
        ...(updateData.personalInfo && { personalInfo: updateData.personalInfo }),
        ...(updateData.address && { address: updateData.address }),
        ...(updateData.education && { education: updateData.education }),
        ...(updateData.familyInformation && { familyInformation: updateData.familyInformation }),
        ...(updateData.expectedLifePartner && { expectedLifePartner: updateData.expectedLifePartner }),
        ...(updateData.contactInfo && { contactInfo: updateData.contactInfo }),
        ...(updateData.personalPreference && { personalPreference: updateData.personalPreference }),
      }
    },
    { new: true, runValidators: true }
  );

  if (!updatedBiodata) {
    throw new Error('Failed to update biodata');
  }

  return updatedBiodata;

};