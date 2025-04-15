import { CustomReq } from '../interfaces/express';
import { PersonalAllDetailsModel } from '../models/PersonalAllDetails.Model';
import escapeStringRegexp from 'escape-string-regexp';

// Helper function to validate and sanitize string input
const sanitizeString = (input: any): string | null => {
  if (typeof input !== 'string' || input.trim() === '') {
    return null;
  }
  // Remove any potentially dangerous characters
  return input.trim();
};

// Helper function to validate and parse numeric input
const parseNumeric = (input: any, defaultValue: number): number => {
  if (input === undefined || input === null) {
    return defaultValue;
  }
  
  const parsed = parseInt(input as string);
  return isNaN(parsed) ? defaultValue : parsed;
};

// Helper function to add range conditions to a field
const addRangeToQuery = (min?: string, max?: string) => {
  const conditions: any = {};
  
  if (min) {
    const minVal = parseNumeric(min, 0);
    conditions['$gte'] = minVal;
  }
  
  if (max) {
    const maxVal = parseNumeric(max, 0);
    conditions['$lte'] = maxVal;
  }
  
  return conditions;
};

export const getBiodataSearch = async (req: CustomReq) => {
  // Get page and limit from query params with validation
  const page = parseNumeric(req.query._page, 1);
  const limit = parseNumeric(req.query._limit, 10);
  const skip = (page - 1) * limit;

  // Build query based on search parameters
  const query: any = {};

  // Simple field filters with validation
  const gender = sanitizeString(req.query.gender);
  if (gender) {
    query['personalInfo.gender'] = gender;
  }
  
  const maritalStatus = sanitizeString(req.query.maritalStatus);
  if (maritalStatus) {
    query['personalInfo.maritalStatus'] = maritalStatus;
  }
  
  const religion = sanitizeString(req.query.religion);
  if (religion) {
    query['personalInfo.religion'] = religion;
  }
  
  const bloodGroup = sanitizeString(req.query.bloodGroup);
  if (bloodGroup) {
    query['personalInfo.bloodGroup'] = bloodGroup;
  }
  
  const complexion = sanitizeString(req.query.complexion);
  if (complexion) {
    query['personalInfo.complexion'] = complexion;
  }

  // Age Range filter with validation
  const today = new Date();
  
  const ageMin = parseNumeric(req.query.ageMin, 0);
  if (ageMin > 0) {
    const minBirthYear = today.getFullYear() - ageMin;
    const maxDate = new Date(minBirthYear, today.getMonth(), today.getDate());
    query['personalInfo.birthDate'] = query['personalInfo.birthDate'] || {};
    query['personalInfo.birthDate']['$lte'] = maxDate.toISOString().split('T')[0];
  }
  
  const ageMax = parseNumeric(req.query.ageMax, 0);
  if (ageMax > 0) {
    const maxBirthYear = today.getFullYear() - ageMax;
    const minDate = new Date(maxBirthYear, today.getMonth(), today.getDate());
    query['personalInfo.birthDate'] = query['personalInfo.birthDate'] || {};
    query['personalInfo.birthDate']['$gte'] = minDate.toISOString().split('T')[0];
  }

  // Height Range filter with validation
  const heightMin = sanitizeString(req.query.heightMin);
  const heightMax = sanitizeString(req.query.heightMax);
  if (heightMin || heightMax) {
    query['personalInfo.height'] = addRangeToQuery(heightMin ?? undefined, heightMax ?? undefined);
  }

  // Occupation filter with secure regex handling and validation
  const occupation = sanitizeString(req.query.occupation);
  if (occupation) {
    const safeOccupation = escapeStringRegexp(occupation);
    query['personalInfo.occupation'] = {
      $regex: new RegExp(safeOccupation, 'i'),
    };
  }

  // Location filters with validation
  const orConditions = [];
  
  // District filter with secure regex handling
  const district = sanitizeString(req.query.district);
  if (district) {
    const safeDistrict = escapeStringRegexp(district);
    const districtRegex = new RegExp(safeDistrict, 'i');
    orConditions.push(
      { 'address.permanentAddress.district': districtRegex },
      { 'address.presentAddress.district': districtRegex }
    );
  }
  
  // Subdistrict filter with secure regex handling
  const subdistrict = sanitizeString(req.query.subdistrict);
  if (subdistrict) {
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

  // Financial Status filter with validation
  const financialStatus = sanitizeString(req.query.financialStatus);
  if (financialStatus) {
    query['familyInformation.financialStatus'] = financialStatus;
  }

  // Fetch the biodata with filters and pagination
  const biodata = await PersonalAllDetailsModel.find(query)
    .skip(skip)
    .limit(limit)
    .exec();

  const totalbiodata = await PersonalAllDetailsModel.countDocuments(query);

  return { biodata, totalbiodata };
};