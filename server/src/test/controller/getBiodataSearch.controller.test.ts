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

    // Mock the service to return biodata and total count
    (getBiodataSearch as jest.Mock).mockResolvedValue({
      biodata: mockBiodata,
      totalbiodata: mockTotal,
    });

    req = {
      query: { gender: 'male', _page: '1', _limit: '10' },
    } as unknown as CustomReq;

    await GetBiodataSearch(req as CustomReq, res as Response);

    // Ensure the service is called with the correct request
    expect(getBiodataSearch).toHaveBeenCalledWith(req);

    // Ensure the response is correct
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      success: true,
      totalbiodata: mockTotal,
      data: mockBiodata,
    });
  });

  it('should handle errors when fetching biodata search results fails', async () => {
    // Mock the service to throw an error
    (getBiodataSearch as jest.Mock).mockRejectedValue(new Error('Something went wrong'));

    req = {
      query: { gender: 'male', _page: '1', _limit: '10' },
    } as unknown as CustomReq;

    await GetBiodataSearch(req as CustomReq, res as Response);

    // Ensure the service is called with the correct request
    expect(getBiodataSearch).toHaveBeenCalledWith(req);

    // Ensure the error response is correct
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      success: false,
      message: 'Failed to fetch data',
    });
  });

  it('should handle empty query parameters gracefully', async () => {
    const mockBiodata: Array<{ id: string; name: string }> = [];
    const mockTotal = 0;

    // Mock the service to return empty results
    (getBiodataSearch as jest.Mock).mockResolvedValue({
      biodata: mockBiodata,
      totalbiodata: mockTotal,
    });

    req = {} as CustomReq;

    await GetBiodataSearch(req as CustomReq, res as Response);

    // Ensure the service is called with the correct request
    expect(getBiodataSearch).toHaveBeenCalledWith(req);

    // Ensure the response is correct
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      success: true,
      totalbiodata: mockTotal,
      data: mockBiodata,
    });
  });
});
