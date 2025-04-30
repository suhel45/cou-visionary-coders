import { reportService } from '../services/report.service'; 
import { PersonalAllDetailsModel } from '../models/PersonalAllDetails.Model';
import { ReportModel } from '../models/report.model';

jest.mock('../models/PersonalAllDetails.Model');
jest.mock('../models/report.model');

describe('reportService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createReport', () => {
    it('should throw an error if biodata is not found', async () => {
      (PersonalAllDetailsModel.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        reportService.createReport('user123', 12345, 'Fake Profile', 'Suspicious behavior')
      ).rejects.toThrow('Biodata not found!');
    });

    it('should throw an error if report already exists', async () => {
      (PersonalAllDetailsModel.findOne as jest.Mock).mockResolvedValue({ biodataNo: 12345 });
      (ReportModel.findOne as jest.Mock).mockResolvedValue({ _id: 'existingReport' });

      await expect(
        reportService.createReport('user123', 12345, 'Fake Profile', 'Already reported')
      ).rejects.toThrow('You have already reported this biodata.');
    });

    it('should create a new report if inputs are valid and no duplicates exist', async () => {
      (PersonalAllDetailsModel.findOne as jest.Mock).mockResolvedValue({ biodataNo: 12345 });
      (ReportModel.findOne as jest.Mock).mockResolvedValue(null);

      const mockSave = jest.fn().mockResolvedValue({
        _id: 'newReportId',
        biodataNo: 12345,
        reporter: 'user123',
        reason: 'Spam',
        reasonDetails: 'Sending unsolicited messages',
      });

      (ReportModel as unknown as jest.Mock).mockImplementation(() => ({
        save: mockSave,
      }));

      const result = await reportService.createReport(
        'user123',
        12345,
        'Spam',
        'Sending unsolicited messages'
      );

      expect(mockSave).toHaveBeenCalled();
      expect(result).toMatchObject({
        biodataNo: 12345,
        reporter: 'user123',
        reason: 'Spam',
      });
    });
  });

  describe('getAllReports', () => {
    it('should return all reports sorted by createdAt', async () => {
      const mockReports = [
        {
          biodataNo: 12345,
          reporter: { username: 'user1', email: 'user1@example.com' },
        },
      ];

      const populateMock = jest.fn().mockReturnThis();
      const sortMock = jest.fn().mockReturnThis();
      const execMock = jest.fn().mockResolvedValue(mockReports);

      (ReportModel.find as jest.Mock).mockReturnValue({
        populate: populateMock,
        sort: sortMock,
        exec: execMock,
      });

      const result = await reportService.getAllReports();

      expect(result).toEqual(mockReports);
      expect(ReportModel.find).toHaveBeenCalled();
      expect(populateMock).toHaveBeenCalledWith('reporter', 'username email');
      expect(sortMock).toHaveBeenCalledWith({ createdAt: -1 });
    });
  });
});
