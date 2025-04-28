import { GetBiodataSearch } from '../../controllers/getBiodataSearch.controller';
import { getBiodataSearch } from '../../services/getBiodataSearch.service';
import { CustomReq } from '../../interfaces/express';
import { Response } from 'express';

// Mock the service
jest.mock('../../services/getBiodataSearch.service');

describe('GetBiodataSearch Controller', () => {
  let req: Partial<CustomReq>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch biodata search results successfully', async () => {
    const mockBiodata = [{ id: '1', name: 'Test User' }];
    const mockTotal = 1;

    (getBiodataSearch as jest.Mock).mockResolvedValue({
      biodata: mockBiodata,
      totalbiodata: mockTotal,
    });

    req = {} as CustomReq;

    await GetBiodataSearch(req as CustomReq, res as Response);

    expect(getBiodataSearch).toHaveBeenCalledWith(req);
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      success: true,
      totalbiodata: mockTotal,
      data: mockBiodata,
    });
  });

  it('should handle error when fetching biodata search results fails', async () => {
    (getBiodataSearch as jest.Mock).mockRejectedValue(new Error('Something went wrong'));

    req = {} as CustomReq;

    await GetBiodataSearch(req as CustomReq, res as Response);

    expect(getBiodataSearch).toHaveBeenCalledWith(req);
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      success: false,
      message: 'Failed to fetch data',
    });
  });
});
