import { IPersonalAllDetails } from '../interfaces/personalAllDetails.interface';
import { PersonalAllDetailsModel } from '../models/PersonalAllDetails.Model';
import { ObjectId } from 'mongodb';

const createBiodata = async (biodata: IPersonalAllDetails) => {
  // Check if the Biodata already exists
  const existingBiodata = await PersonalAllDetailsModel.findOne({
    users: { $eq: biodata.users },
  });
  if (existingBiodata) {
    throw new Error('Biodata already exists!');
  }

  // Get the total count of biodata to generate a unique biodata number
  const totalBiodataCount = await PersonalAllDetailsModel.countDocuments();
  const uniqueBiodataNo = totalBiodataCount + 1;
  
  // Save the Biodata to the database
  const newBiodata = new PersonalAllDetailsModel({
    biodataNo: uniqueBiodataNo,
    users: biodata.users,
    personalInfo: biodata.personalInfo,
    address: biodata.address,
    education: biodata.education,
    familyInformation: biodata.familyInformation,
    expectedLifePartner: biodata.expectedLifePartner,
    contactInfo: biodata.contactInfo,
    personalPreference: biodata.personalPreference,
  });

  const result = await newBiodata.save();
  return result;
};

const getBiodata = async (id: string) => {
  const filter = { users: new ObjectId(id) };

  const result = await PersonalAllDetailsModel.findOne(filter)
    .populate('users')
    .lean() // Convert Mongoose document to a plain JSON object
    .orFail();
  return result;
};

export const personalDetailsService = {
  createBiodata,
  getBiodata,
};
