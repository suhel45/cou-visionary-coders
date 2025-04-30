// report.services.test.ts
import { reportService } from '../services/report.service';
import { PersonalAllDetailsModel as OriginalPersonalAllDetailsModel } from '../models/PersonalAllDetails.Model';
import { ReportModel as OriginalReportModel } from '../models/report.model';

// Mock PersonalAllDetailsModel and ReportModel
jest.mock('../models/PersonalAllDetails.Model', () => ({
  PersonalAllDetailsModel: {
    findOne: jest.fn(),
  },
}));

jest.mock('../models/report.model', () => {
  const saveMock = jest.fn();

  const ReportModelMock = jest.fn().mockImplementation(() => ({
    save: saveMock,
  }));

  (ReportModelMock as any).findOne = jest.fn();
  (ReportModelMock as any).find = jest.fn();

  return { ReportModel: ReportModelMock };
});

// Import mocks
const { PersonalAllDetailsModel }: any = jest.requireMock(
  '../models/PersonalAllDetails.Model',
);
// Use OriginalPersonalAllDetailsModel if needed elsewhere
const { ReportModel }: any = jest.requireMock('../models/report.model');

describe('reportService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createReport', () => {
    it('should create a new report if biodata exists and no prior report by the user', async () => {
      // Arrange
      (PersonalAllDetailsModel.findOne as jest.Mock).mockResolvedValue({
        biodataNo: 123,
      });
      (ReportModel.findOne as jest.Mock).mockResolvedValue(null);
      (new ReportModel().save as jest.Mock).mockResolvedValue({
        _id: 'new-report-id',
        biodataNo: 123,
        reason: 'fake_profile',
        reasonDetails: 'This profile is fake.',
        reporter: 'user123',
      });

      // Act
      const result = await reportService.createReport(
        'user123',
        123,
        'fake_profile',
        'This profile is fake.',
      );

      // Assert
      expect(PersonalAllDetailsModel.findOne).toHaveBeenCalledWith({
        biodataNo: { $eq: 123 },
      });
      expect(ReportModel.findOne).toHaveBeenCalledWith({
        biodataNo: { $eq: 123 },
        reporter: 'user123',
      });
      expect(new ReportModel().save).toHaveBeenCalled();
      expect(result).toEqual({
        _id: 'new-report-id',
        biodataNo: 123,
        reason: 'fake_profile',
        reasonDetails: 'This profile is fake.',
        reporter: 'user123',
      });
    });

    it('should throw an error if biodata does not exist', async () => {
      // Arrange
      (PersonalAllDetailsModel.findOne as jest.Mock).mockResolvedValue(null);

      // Act & Assert
      await expect(
        reportService.createReport(
          'user123',
          999,
          'harassment',
          'This profile harassed me.',
        ),
      ).rejects.toThrow('Biodata not found!');

      expect(PersonalAllDetailsModel.findOne).toHaveBeenCalledWith({
        biodataNo: { $eq: 999 },
      });
    });

    it('should throw an error if user already reported this biodata', async () => {
      // Arrange
      (PersonalAllDetailsModel.findOne as jest.Mock).mockResolvedValue({
        biodataNo: 123,
      });
      (ReportModel.findOne as jest.Mock).mockResolvedValue({
        _id: 'existing-report-id',
      });

      // Act & Assert
      await expect(
        reportService.createReport(
          'user123',
          123,
          'scam',
          'Scam profile detected.',
        ),
      ).rejects.toThrow('You have already reported this biodata.');

      expect(ReportModel.findOne).toHaveBeenCalledWith({
        biodataNo: { $eq: 123 },
        reporter: 'user123',
      });
    });
  });

  describe('getAllReports', () => {
    it('should return the list of all reports', async () => {
      // Arrange
      const execMock = jest.fn().mockResolvedValue([
        {
          _id: 'report1',
          biodataNo: 101,
          reason: 'fake_profile',
          reporter: { username: 'User1', email: 'user1@example.com' },
        },
      ]);

      const sortMock = jest.fn().mockReturnValue({ exec: execMock });
      const populateMock = jest.fn().mockReturnValue({ sort: sortMock });

      (ReportModel.find as jest.Mock).mockReturnValue({
        populate: populateMock,
      });

      // Act
      const result = await reportService.getAllReports();

      // Assert
      expect(ReportModel.find).toHaveBeenCalled();
      expect(populateMock).toHaveBeenCalledWith('reporter', 'username email');
      expect(result).toEqual([
        {
          _id: 'report1',
          biodataNo: 101,
          reason: 'fake_profile',
          reporter: { username: 'User1', email: 'user1@example.com' },
        },
      ]);
    });
  });
});
