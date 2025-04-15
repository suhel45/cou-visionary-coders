import { CustomReq } from '../interfaces/express';
import { PersonalAllDetailsModel } from '../models/PersonalAllDetails.Model';
import escapeStringRegexp from 'escape-string-regexp';

// Helper function to add range conditions to a field
const addRangeToQuery = (field: string, min?: string, max?: string) => {
  const conditions: any = {};
  
  if (min) {
    conditions['$gte'] = parseInt(min);
  }
  
  if (max) {
    conditions['$lte'] = parseInt(max);
  }
  
  return conditions;
};

export const getBiodataSearch = async (req: CustomReq) => {
  // Get page and limit from query params
  const page = parseInt(req.query._page as string) || 1;
  const limit = parseInt(req.query._limit as string) || 10;
  const skip = (page - 1) * limit;

  // Build query based on search parameters
  const query: any = {};

  // Simple field filters
  if (req.query.gender) {
    query['personalInfo.gender'] = req.query.gender;
  }
  
  if (req.query.maritalStatus) {
    query['personalInfo.maritalStatus'] = req.query.maritalStatus;
  }
  
  if (req.query.religion) {
    query['personalInfo.religion'] = req.query.religion;
  }
  
  if (req.query.bloodGroup) {
    query['personalInfo.bloodGroup'] = req.query.bloodGroup;
  }
  
  if (req.query.complexion) {
    query['personalInfo.complexion'] = req.query.complexion;
  }

  // Age Range filter - using a flat structure to avoid nesting
  const today = new Date();
  
  if (req.query.ageMin) {
    const minBirthYear = today.getFullYear() - parseInt(req.query.ageMin as string);
    const maxDate = new Date(minBirthYear, today.getMonth(), today.getDate());
    query['personalInfo.birthDate'] = query['personalInfo.birthDate'] || {};
    query['personalInfo.birthDate']['$lte'] = maxDate.toISOString().split('T')[0];
  }
  
  if (req.query.ageMax) {
    const maxBirthYear = today.getFullYear() - parseInt(req.query.ageMax as string);
    const minDate = new Date(maxBirthYear, today.getMonth(), today.getDate());
    query['personalInfo.birthDate'] = query['personalInfo.birthDate'] || {};
    query['personalInfo.birthDate']['$gte'] = minDate.toISOString().split('T')[0];
  }

  // Height Range filter - avoiding nesting by pre-checking
  if (req.query.heightMin || req.query.heightMax) {
    query['personalInfo.height'] = addRangeToQuery(
      'personalInfo.height',
      req.query.heightMin as string,
      req.query.heightMax as string
    );
  }

  // Occupation filter with secure regex handling using escapeStringRegexp
  if (req.query.occupation) {
    const occupation = req.query.occupation as string;
    const safeOccupation = escapeStringRegexp(occupation);
    query['personalInfo.occupation'] = {
      $regex: new RegExp(safeOccupation, 'i'),
    };
  }

  // Location filters
  const orConditions = [];
  
  // District filter with secure regex handling
  if (req.query.district) {
    const district = req.query.district as string;
    const safeDistrict = escapeStringRegexp(district);
    const districtRegex = new RegExp(safeDistrict, 'i');
    orConditions.push(
      { 'address.permanentAddress.district': districtRegex },
      { 'address.presentAddress.district': districtRegex }
    );
  }
  
  // Subdistrict filter with secure regex handling
  if (req.query.subdistrict) {
    const subdistrict = req.query.subdistrict as string;
    const safeSubdistrict = escapeStringRegexp(subdistrict);
    const subdistrictRegex = new RegExp(safeSubdistrict, 'i');
    orConditions.push(
      { 'address.permanentAddress.subdistrict': subdistrictRegex },
      { 'address.presentAddress.subdistrict': subdistrictRegex }
    );
  }
  
  // Only add $or if we have conditions
  if (orConditions.length > 0) {
    query['$or'] = orConditions;
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