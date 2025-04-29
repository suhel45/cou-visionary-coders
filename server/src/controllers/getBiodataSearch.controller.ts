import { CustomReq } from '../interfaces/express';
import { Response } from 'express';
import { getBiodataSearch } from '../services/getBiodataSearch.service';
import logger from '../utils/logger.util';

export const GetBiodataSearch = async (
  req: CustomReq,
  res: Response,
): Promise<void> => {
  try {
    const { biodata, totalbiodata } = await getBiodataSearch(req);
    res.status(200).json({
      success: true,
      totalbiodata,
      data: biodata,
    });
  } catch (error) {
    logger.error('Error in GetBiodataSearch:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch data',
    });
  }
};
