// src/test/getBiodataSearch.service.test.ts

import { getBiodataSearch } from '../services/getBiodataSearch.service';
import { PersonalAllDetailsModel } from '../models/PersonalAllDetails.Model';
import { ObjectId } from 'mongodb';
import { CustomReq } from '../interfaces/express';

// Mock PersonalAllDetailsModel methods
jest.mock('../models/PersonalAllDetails.Model', () => ({
  PersonalAllDetailsModel: {
    find: jest.fn(),
    countDocuments: jest.fn(),
  },
}));

describe('getBiodataSearch', () => {
  const mockBiodata = [
    {
      _id: new ObjectId(),
      biodataNo: 1,
      users: new ObjectId(),
      personalInfo: {
        gender: 'Male',
        occupation: 'Engineer',
        birthDate: '1995-06-15',
      },
      address: {
        permanentAddress: { district: 'Dhaka' },
        presentAddress: { district: 'Chittagong' },
      },
      familyInformation: {
        financialStatus: 'Middle Class',
      },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return biodata without filters (default pagination)', async () => {
    (PersonalAllDetailsModel.find as jest.Mock).mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(mockBiodata),
    });

    (PersonalAllDetailsModel.countDocuments as jest.Mock).mockResolvedValue(1);

    const req = {
      query: {},
    } as unknown as CustomReq;

    const result = await getBiodataSearch(req);

    expect(PersonalAllDetailsModel.find).toHaveBeenCalledWith({});
    expect(PersonalAllDetailsModel.countDocuments).toHaveBeenCalledWith({});
    expect(result).toEqual({ biodata: mockBiodata, totalbiodata: 1 });
  });

  it('should apply gender filter correctly', async () => {
    (PersonalAllDetailsModel.find as jest.Mock).mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(mockBiodata),
    });

    (PersonalAllDetailsModel.countDocuments as jest.Mock).mockResolvedValue(1);

    const req = {
      query: {
        gender: 'Male',
      },
    } as unknown as CustomReq;

    const result = await getBiodataSearch(req);

    expect(PersonalAllDetailsModel.find).toHaveBeenCalledWith({
      'personalInfo.gender': 'Male',
    });
    expect(PersonalAllDetailsModel.countDocuments).toHaveBeenCalledWith({
      'personalInfo.gender': 'Male',
    });
    expect(result).toEqual({ biodata: mockBiodata, totalbiodata: 1 });
  });

  it('should apply district filter correctly using $or condition', async () => {
    (PersonalAllDetailsModel.find as jest.Mock).mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(mockBiodata),
    });

    (PersonalAllDetailsModel.countDocuments as jest.Mock).mockResolvedValue(1);

    const req = {
      query: {
        district: 'Dhaka',
      },
    } as unknown as CustomReq;

    const safeRegex = new RegExp('Dhaka', 'i');

    const expectedQuery = {
      $or: [
        { 'address.permanentAddress.district': safeRegex },
        { 'address.presentAddress.district': safeRegex },
      ],
    };

    const result = await getBiodataSearch(req);

    expect(PersonalAllDetailsModel.find).toHaveBeenCalledWith(expectedQuery);
    expect(PersonalAllDetailsModel.countDocuments).toHaveBeenCalledWith(expectedQuery);
    expect(result).toEqual({ biodata: mockBiodata, totalbiodata: 1 });
  });

  it('should apply pagination parameters (_page and _limit)', async () => {
    const skipMock = jest.fn().mockReturnThis();
    const limitMock = jest.fn().mockReturnThis();
    const execMock = jest.fn().mockResolvedValue(mockBiodata);

    (PersonalAllDetailsModel.find as jest.Mock).mockReturnValue({
      skip: skipMock,
      limit: limitMock,
      exec: execMock,
    });

    (PersonalAllDetailsModel.countDocuments as jest.Mock).mockResolvedValue(1);

    const req = {
      query: {
        _page: '2',
        _limit: '5',
      },
    } as unknown as CustomReq;

    const result = await getBiodataSearch(req);

    expect(skipMock).toHaveBeenCalledWith(5); // (page - 1) * limit = (2-1)*5=5
    expect(limitMock).toHaveBeenCalledWith(5);
    expect(result).toEqual({ biodata: mockBiodata, totalbiodata: 1 });
  });

  it('should handle filters for occupation correctly', async () => {
    (PersonalAllDetailsModel.find as jest.Mock).mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(mockBiodata),
    });

    (PersonalAllDetailsModel.countDocuments as jest.Mock).mockResolvedValue(1);

    const req = {
      query: {
        occupation: 'Engineer',
      },
    } as unknown as CustomReq;

    const safeRegex = new RegExp('Engineer', 'i');

    const result = await getBiodataSearch(req);

    expect(PersonalAllDetailsModel.find).toHaveBeenCalledWith({
      'personalInfo.occupation': { $regex: safeRegex },
    });
    expect(result).toEqual({ biodata: mockBiodata, totalbiodata: 1 });
  });
});
