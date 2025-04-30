// tests/deleteBiodata.service.test.ts
import { deleteBiodata } from '../services/deleteBiodata.service'; // Adjust path as needed
// Removed import for PersonalAllDetailsModel as it conflicts with the local mock declaration

jest.mock('../models/PersonalAllDetails.Model', () => ({
  PersonalAllDetailsModel: {
    findOne: jest.fn(),
    findOneAndDelete: jest.fn(),
  },
}));

const { PersonalAllDetailsModel }: any = jest.requireMock(
  '../models/PersonalAllDetails.Model',
);

describe('deleteBiodata', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete existing biodata successfully', async () => {
    const mockBiodata = { _id: 'biodata123', users: 'user123' };

    (PersonalAllDetailsModel.findOne as jest.Mock).mockResolvedValue(
      mockBiodata,
    );
    (PersonalAllDetailsModel.findOneAndDelete as jest.Mock).mockResolvedValue(
      mockBiodata,
    );

    const result = await deleteBiodata('user123');

    expect(PersonalAllDetailsModel.findOne).toHaveBeenCalledWith({
      users: { $eq: 'user123' },
    });
    expect(PersonalAllDetailsModel.findOneAndDelete).toHaveBeenCalledWith({
      users: { $eq: 'user123' },
    });
    expect(result).toEqual(mockBiodata);
  });

  it('should throw an error if biodata not found', async () => {
    (PersonalAllDetailsModel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(deleteBiodata('user123')).rejects.toThrow(
      'Biodata not found for this user!',
    );

    expect(PersonalAllDetailsModel.findOne).toHaveBeenCalledWith({
      users: { $eq: 'user123' },
    });
    expect(PersonalAllDetailsModel.findOneAndDelete).not.toHaveBeenCalled();
  });

  it('should throw an error if deletion fails', async () => {
    const mockBiodata = { _id: 'biodata123', users: 'user123' };

    (PersonalAllDetailsModel.findOne as jest.Mock).mockResolvedValue(
      mockBiodata,
    );
    (PersonalAllDetailsModel.findOneAndDelete as jest.Mock).mockResolvedValue(
      null,
    );

    await expect(deleteBiodata('user123')).rejects.toThrow(
      'Failed to delete biodata',
    );

    expect(PersonalAllDetailsModel.findOne).toHaveBeenCalledWith({
      users: { $eq: 'user123' },
    });
    expect(PersonalAllDetailsModel.findOneAndDelete).toHaveBeenCalledWith({
      users: { $eq: 'user123' },
    });
  });
});
