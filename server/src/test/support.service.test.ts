// support.services.test.ts
import { supportService } from '../services/support.service';
import { SupportModel as OriginalSupportModel } from '../models/support.model';

// Mock SupportModel properly
jest.mock('../models/support.model', () => {
  const OriginalSupportModel = jest.requireActual(
    '../models/support.model',
  ).SupportModel;
  // Create a save mock separately
  const saveMock = jest.fn();

  // Mock the SupportModel constructor
  const SupportModelMock = jest.fn().mockImplementation(() => ({
    save: saveMock,
  })) as jest.Mock & {
    findOne: jest.Mock;
    find: jest.Mock;
  };

  // Mock static methods
  SupportModelMock.findOne = jest.fn();
  SupportModelMock.find = jest.fn();

  // Export both
  return { SupportModel: SupportModelMock };
});

// Now get the mocks ready to use
const { SupportModel }: any = jest.requireMock('../models/support.model');

describe('supportService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addToSupport', () => {
    it('should save a new support request if no duplicate exists', async () => {
      // Arrange
      (SupportModel.findOne as jest.Mock).mockResolvedValue(null);
      (new SupportModel().save as jest.Mock).mockResolvedValue({
        _id: 'new-support-id',
        user: 'user123',
        message: 'Help me!',
      });

      // Act
      const result = await supportService.addToSupport('user123', 'Help me!');

      // Assert
      expect(SupportModel.findOne).toHaveBeenCalledWith({
        user: 'user123',
        message: { $eq: 'Help me!' },
      });
      expect(new SupportModel().save).toHaveBeenCalled();
      expect(result).toEqual({
        _id: 'new-support-id',
        user: 'user123',
        message: 'Help me!',
      });
    });

    it('should throw an error if duplicate support request exists', async () => {
      // Arrange
      (SupportModel.findOne as jest.Mock).mockResolvedValue({
        _id: 'existing-support-id',
      });

      // Act & Assert
      await expect(
        supportService.addToSupport('user123', 'Help me again!'),
      ).rejects.toThrow(
        'Duplicate support request: same message already submitted.',
      );

      expect(SupportModel.findOne).toHaveBeenCalledWith({
        user: 'user123',
        message: { $eq: 'Help me again!' },
      });
    });
  });

  describe('getSupportList', () => {
    it('should return the support list sorted by createdAt', async () => {
      // Arrange
      const execMock = jest
        .fn()
        .mockResolvedValue([
          {
            _id: 'support1',
            message: 'Message1',
            user: { username: 'User1', email: 'u1@example.com' },
          },
        ]);

      const populateMock = jest
        .fn()
        .mockReturnValue({
          sort: jest.fn().mockReturnValue({ exec: execMock }),
        });

      (SupportModel.find as jest.Mock).mockReturnValue({
        populate: populateMock,
      });

      // Act
      const result = await supportService.getSupportList();

      // Assert
      expect(SupportModel.find).toHaveBeenCalled();
      expect(populateMock).toHaveBeenCalledWith('user', 'username email');
      expect(result).toEqual([
        {
          _id: 'support1',
          message: 'Message1',
          user: { username: 'User1', email: 'u1@example.com' },
        },
      ]);
    });
  });
});
