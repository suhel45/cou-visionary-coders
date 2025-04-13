import { CustomReq } from '../interfaces/express';
import { PersonalAllDetailsModel } from '../models/PersonalAllDetails.Model';

export const getBiodataSearch = async (req: CustomReq) => {
  // Get page and limit from query params
  const page = parseInt(req.query._page as string) || 1;
  const limit = parseInt(req.query._limit as string) || 10;
  const skip = (page - 1) * limit;

  // Build query based on search parameters
  const query: any = {};

  // Gender filter
  if (req.query.gender) {
    query['personalInfo.gender'] = req.query.gender;
  }

  // Marital Status filter
  if (req.query.maritalStatus) {
    query['personalInfo.maritalStatus'] = req.query.maritalStatus;
  }

  // Religion filter
  if (req.query.religion) {
    query['personalInfo.religion'] = req.query.religion;
  }

  // Blood Group filter
  if (req.query.bloodGroup) {
    query['personalInfo.bloodGroup'] = req.query.bloodGroup;
  }

  // Complexion filter
  if (req.query.complexion) {
    query['personalInfo.complexion'] = req.query.complexion;
  }

  // Age Range filter (convert birthDate to age)
  if (req.query.ageMin || req.query.ageMax) {
    const today = new Date();

    if (req.query.ageMin) {
      const minBirthYear =
        today.getFullYear() - parseInt(req.query.ageMin as string);
      const maxDate = new Date(minBirthYear, today.getMonth(), today.getDate());
      query['personalInfo.birthDate'] = query['personalInfo.birthDate'] || {};
      query['personalInfo.birthDate']['$lte'] = maxDate
        .toISOString()
        .split('T')[0];
    }

    if (req.query.ageMax) {
      const maxBirthYear =
        today.getFullYear() - parseInt(req.query.ageMax as string);
      const minDate = new Date(maxBirthYear, today.getMonth(), today.getDate());
      query['personalInfo.birthDate'] = query['personalInfo.birthDate'] || {};
      query['personalInfo.birthDate']['$gte'] = minDate
        .toISOString()
        .split('T')[0];
    }
  }

  // Height Range filter
  if (req.query.heightMin) {
    query['personalInfo.height'] = query['personalInfo.height'] || {};
    query['personalInfo.height']['$gte'] = parseInt(
      req.query.heightMin as string,
    );
  }

  if (req.query.heightMax) {
    query['personalInfo.height'] = query['personalInfo.height'] || {};
    query['personalInfo.height']['$lte'] = parseInt(
      req.query.heightMax as string,
    );
  }

  // Occupation filter (using regex for partial matching)
  if (req.query.occupation) {
    query['personalInfo.occupation'] = {
      $regex: new RegExp(req.query.occupation as string, 'i'),
    };
  }

  // District filter (check both permanent and present address)
  if (req.query.district) {
    const districtRegex = new RegExp(req.query.district as string, 'i');
    query['$or'] = [
      { 'address.permanentAddress.district': districtRegex },
      { 'address.presentAddress.district': districtRegex },
    ];
  }

  // Financial Status filter
  if (req.query.financialStatus) {
    query['familyInformation.financialStatus'] = req.query.financialStatus;
  }

  // Fetch the biodata with filters and pagination
  const biodata = await PersonalAllDetailsModel.find(query)
    .skip(skip)
    .limit(limit)
    .exec();

  const totalbiodata = await PersonalAllDetailsModel.countDocuments(query);

  return { biodata, totalbiodata };
};
