import mongoose from 'mongoose';
import { updateBiodata } from '../services/updateBiodata.service';
import { PersonalAllDetailsModel } from '../models/PersonalAllDetails.Model';
import { IPersonalAllDetails } from '../interfaces/personalAllDetails.interface';

jest.mock('../models/PersonalAllDetails.Model');

describe('updateBiodata Service', () => {
  const userId = new mongoose.Types.ObjectId('507f1f77bcf86cd799439011');

  const mockBiodata: IPersonalAllDetails = {
    biodataNo: 1,
    users: userId ,
    personalInfo: {
      gender: 'male',
      maritalStatus: 'single',
      birthDate: '1995-01-01',
      height: '5.7',
      weight: '65',
      occupation: 'Engineer',
      complexion: 'Fair',
      religion: 'Islam',
      bloodGroup: 'A+',
    },
    address: {
        permanentAddress:{district:"Cumilla",subdistrict:"Kotbari",village:"Bagmara"},
        presentAddress:{district:"Cumilla",subdistrict:"Kotbari",village:"Bagmara"},
    },
    education: {
      ssc: { passingYear: 2010, group: 'Science', gpa: 5.0 },
      hsc: { passingYear: 2012, group: 'Science', gpa: 5.0 },
      university: {
        honours: {
          faculty: 'Science & Tech',
          department: 'CSE',
          session: '2013-14',
        },
        masters: {
          faculty: 'Engineering',
          department: 'IT',
          session: '2018-19',
        },
      },
    },
    familyInformation: {
      father: {
        aliveStatus: 'alive',
        profession: 'Businessman',
      },
      mother: {
        aliveStatus: 'alive',
        profession: 'Homemaker',
      },
      siblings: {
        brotherInfo: '1 brother',
        sisterInfo: '1 sister',
        aboutSiblings: 'Nice family',
      },
      financialStatus: 'Middle-class',
    },
    expectedLifePartner: {
      age: '25-30',
      complexion: 'Fair',
      height: '5.3-5.8',
      district: 'Dhaka',
      maritalStatus: 'Single',
      profession: 'Any',
      financialCondition: 'Good',
      expectedQualities: 'Kind, Educated',
    },
    contactInfo: {
      guardianInfo: 'Father',
      guardianContact: '01911111111',
      candidateNumber: '01700000000',
      candidateEmail: 'test@example.com',
    },
    personalPreference: {
      hobbies: 'Reading, Travelling',
      healthIssues: 'None',
      religiousPractice: 'Regular',
      readingHabit: 'Often',
      lifeStylePreference: 'Simple',
      additionalInfo: 'Friendly and honest',
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update biodata successfully', async () => {
    const updateData = {
      users: userId,
      personalInfo: {
        gender: 'female',
        maritalStatus: 'single',
        birthDate: '1996-01-01',
        height: '5.4',
        weight: '55',
        occupation: 'Doctor',
        complexion: 'Medium',
        religion: 'Islam',
        bloodGroup: 'B+',
      },
    };

    (PersonalAllDetailsModel.findOne as jest.Mock).mockResolvedValue(mockBiodata);

    const updatedBiodata = {
      ...mockBiodata,
      personalInfo: updateData.personalInfo!,
    };
    (PersonalAllDetailsModel.findOneAndUpdate as jest.Mock).mockResolvedValue(updatedBiodata);

    const result = await updateBiodata(updateData);

    expect(PersonalAllDetailsModel.findOne).toHaveBeenCalledWith({
      users: { $eq: updateData.users },
    });

    expect(PersonalAllDetailsModel.findOneAndUpdate).toHaveBeenCalledWith(
      { users: { $eq: updateData.users } },
      {
        $set: {
          personalInfo: updateData.personalInfo,
        },
      },
      { new: true, runValidators: true },
    );

    expect(result).toEqual(updatedBiodata);
  });

  it('should throw an error if biodata is not found', async () => {
    const updateData = {
      users: userId,
      personalInfo: {
        gender: 'female',
        maritalStatus: 'single',
        birthDate: '1996-01-01',
        height: '5.4',
        weight: '55',
        occupation: 'Doctor',
        complexion: 'Medium',
        religion: 'Islam',
        bloodGroup: 'B+',
      },
    };

    (PersonalAllDetailsModel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(updateBiodata(updateData)).rejects.toThrow(
      'Biodata not found for this user!',
    );

    expect(PersonalAllDetailsModel.findOne).toHaveBeenCalledWith({
      users: { $eq: updateData.users },
    });

    expect(PersonalAllDetailsModel.findOneAndUpdate).not.toHaveBeenCalled();
  });

  it('should throw an error if update fails', async () => {
    const updateData = {
      users: userId,
      personalInfo: {
        gender: 'female',
        maritalStatus: 'single',
        birthDate: '1996-01-01',
        height: '5.4',
        weight: '55',
        occupation: 'Doctor',
        complexion: 'Medium',
        religion: 'Islam',
        bloodGroup: 'B+',
      },
    };

    (PersonalAllDetailsModel.findOne as jest.Mock).mockResolvedValue(mockBiodata);
    (PersonalAllDetailsModel.findOneAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(updateBiodata(updateData)).rejects.toThrow('Failed to update biodata');

    expect(PersonalAllDetailsModel.findOne).toHaveBeenCalledWith({
      users: { $eq: updateData.users },
    });

    expect(PersonalAllDetailsModel.findOneAndUpdate).toHaveBeenCalled();
  });
});
