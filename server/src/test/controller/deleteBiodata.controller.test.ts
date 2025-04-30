import { deleteBiodataController } from '../../controllers/deleteBiodata.controller';
import { deleteBiodata } from '../../services/deleteBiodata.service';
import logger from '../../utils/logger.util';
import { Request, Response } from 'express';

// Mock dependencies
jest.mock('../../services/deleteBiodata.service');
jest.mock('../../utils/logger.util');

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('deleteBiodataController', () => {
  let req: Partial<Request>;
  let res: Response;

  beforeEach(() => {
    req = {
      user: { id: 'user123' },
    } as any; // Force type cast to match CustomRequest
    res = mockResponse();
    jest.clearAllMocks();
  });

  it('should delete biodata successfully', async () => {
    const mockDeletedBiodata = { id: 'user123', name: 'John Doe' };

    (deleteBiodata as jest.Mock).mockResolvedValueOnce(mockDeletedBiodata);

    await deleteBiodataController(req as Request, res);

    expect(deleteBiodata).toHaveBeenCalledWith('user123');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Biodata deleted successfully',
      data: mockDeletedBiodata,
    });
  });

  it('should handle error during biodata deletion', async () => {
    const mockError = new Error('Failed to delete biodata');

    (deleteBiodata as jest.Mock).mockRejectedValueOnce(mockError);

    await deleteBiodataController(req as Request, res);

    expect(deleteBiodata).toHaveBeenCalledWith('user123');
    expect(logger.error).toHaveBeenCalledWith('Error deleting biodata:', mockError.message);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: mockError.message,
    });
  });

  it('should handle unknown errors during biodata deletion', async () => {
    (deleteBiodata as jest.Mock).mockRejectedValueOnce('Unknown error');

    await deleteBiodataController(req as Request, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Internal server error',
    });
  });
});
