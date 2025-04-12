import { PersonalAllDetailsModel } from "../models/PersonalAllDetails.Model";

export const deleteBiodata = async (biodataId: string) => {
    // Find the biodata for the user
    const existingBiodata = await PersonalAllDetailsModel.findOne({
      users: { $eq: biodataId },
    });
    
    // If no biodata exists, throw an error
    if (!existingBiodata) {
      throw new Error('Biodata not found for this user!');
    }
  
    // Delete the biodata
    const result = await PersonalAllDetailsModel.findOneAndDelete({ users: { $eq: biodataId } });
    
    if (!result) {
      throw new Error('Failed to delete biodata');
    }
  
    return result;
  };