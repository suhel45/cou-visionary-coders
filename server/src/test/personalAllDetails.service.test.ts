import { personalDetailsService } from '../services/personalAllDetails.service';
import { PersonalAllDetailsModel } from '../models/PersonalAllDetails.Model';
import { IPersonalAllDetails } from '../interfaces/personalAllDetails.interface';
import { ObjectId } from 'mongodb';

// Extend the interface temporarily for testing
interface IPersonalAllDetailsWithId extends IPersonalAllDetails {
  _id: ObjectId;
}

// Mock the PersonalAllDetailsModel
jest.mock('../models/PersonalAllDetails.Model');

const mockPersonalAllDetails = {
  _id: new ObjectId(),
  biodataNo: 1,
  users: new ObjectId(),
  personalInfo: { gender: 'Male' },
  address: {},
  education: {},
  familyInformation: {},
  expectedLifePartner: {},
  contactInfo: {},
  personalPreference: {},
} as unknown as IPersonalAllDetailsWithId;

describe('personalDetailsService', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createBiodata', () => {
    it('should create a new biodata successfully', async () => {
      (PersonalAllDetailsModel.findOne as jest.Mock).mockResolvedValue(null);
      (PersonalAllDetailsModel.countDocuments as jest.Mock).mockResolvedValue(0);
      (PersonalAllDetailsModel.prototype.save as jest.Mock).mockResolvedValue(mockPersonalAllDetails);

      const result = await personalDetailsService.createBiodata(mockPersonalAllDetails);

      expect(PersonalAllDetailsModel.findOne).toHaveBeenCalledWith({ users: { $eq: mockPersonalAllDetails.users } });
      expect(PersonalAllDetailsModel.countDocuments).toHaveBeenCalled();
      expect(result).toEqual(mockPersonalAllDetails);
    });

    it('should throw error if biodata already exists', async () => {
      (PersonalAllDetailsModel.findOne as jest.Mock).mockResolvedValue(mockPersonalAllDetails);

      await expect(personalDetailsService.createBiodata(mockPersonalAllDetails))
        .rejects
        .toThrow('Biodata already exists!');
    });
  });

  describe('getBiodata', () => {
    it('should get a biodata by user ID', async () => {
      (PersonalAllDetailsModel.findOne as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        lean: jest.fn().mockReturnThis(),
        orFail: jest.fn().mockResolvedValue(mockPersonalAllDetails),
      });

      const result = await personalDetailsService.getBiodata(mockPersonalAllDetails.users.toString());

      expect(PersonalAllDetailsModel.findOne).toHaveBeenCalledWith({ users: new ObjectId(mockPersonalAllDetails.users.toString()) });
      expect(result).toEqual(mockPersonalAllDetails);
    });
  });

  describe('getPublicBiodataDetails', () => {
    it('should get public biodata details by ID', async () => {
      (PersonalAllDetailsModel.findOne as jest.Mock).mockResolvedValue(mockPersonalAllDetails);

      const result = await personalDetailsService.getPublicBiodataDetails(mockPersonalAllDetails._id.toString());

      expect(PersonalAllDetailsModel.findOne).toHaveBeenCalledWith({ _id: new ObjectId(mockPersonalAllDetails._id.toString()) });
      expect(result).toEqual(mockPersonalAllDetails);
    });
  });

  describe('getBiodataStats', () => {
    it('should return biodata stats', async () => {
      (PersonalAllDetailsModel.countDocuments as jest.Mock)
        .mockResolvedValueOnce(10) // total
        .mockResolvedValueOnce(6)  // male
        .mockResolvedValueOnce(4); // female

      const result = await personalDetailsService.getBiodataStats();

      expect(result).toEqual({ total: 10, male: 6, female: 4 });
    });
  });

});
