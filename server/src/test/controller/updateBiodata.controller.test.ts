import { updateBiodataController } from '../../controllers/updateBiodata.controller';
import { updateBiodata } from '../../services/updateBiodata.service';
import logger from '../../utils/logger.util';
import { Request, Response } from 'express';

// Mock dependencies
jest.mock('../../services/updateBiodata.service');
jest.mock('../../utils/logger.util');

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('updateBiodataController', () => {
  let req: Partial<Request>;
  let res: Response;

  beforeEach(() => {
    req = {
      body: {},
      user: { id: 'user123' },
    } as any; // Casting to any to allow CustomRequest
    res = mockResponse();
    jest.clearAllMocks();
  });

  it('should update biodata successfully', async () => {
    const mockUpdateData = { name: 'John Doe', age: 30 };
    const mockUpdatedDocument = { ...mockUpdateData, _id: 'doc123' };

    (updateBiodata as jest.Mock).mockResolvedValueOnce(mockUpdatedDocument);

    req.body = { name: 'John Doe', age: 30 };

    await updateBiodataController(req as Request, res);

    expect(updateBiodata).toHaveBeenCalledWith({
      ...mockUpdateData,
      users: 'user123',
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Biodata updated successfully',
      data: mockUpdatedDocument,
    });
  });

  it('should handle error during biodata update', async () => {
    const mockError = new Error('Failed to update biodata');
    (updateBiodata as jest.Mock).mockRejectedValueOnce(mockError);

    req.body = { name: 'Jane Doe', age: 28 };

    await updateBiodataController(req as Request, res);

    expect(updateBiodata).toHaveBeenCalledWith({
      ...req.body,
      users: 'user123',
    });
    expect(logger.error).toHaveBeenCalledWith(
      'Error updating biodata:',
      mockError.message,
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: mockError.message,
    });
  });
});
