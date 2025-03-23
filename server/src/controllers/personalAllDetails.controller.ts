import { Request, Response } from 'express';
import { personalDetailsService } from '../services/personalAllDetails.service';
import { CustomReq } from '../interfaces/express';

interface CustomRequest extends Request {
  user: {
    id: string;
  };
}

const Biodata = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as CustomRequest).user.id;
    req.body.users = userId;
    const result = await personalDetailsService.createBiodata(req.body);

    res.status(200).json({
      success: true,
      message: 'Biodata created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error && error.message === 'Biodata already exists!') {
      res.status(400).json({
        success: false,
        message: error.message,
      });
      return;
    }
  }
};

const GetBiodata = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as CustomRequest).user.id;
    const result = await personalDetailsService.getBiodata(userId);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Failed to fetch data' });
  }
};

const GetPublicBiodata = async (req: CustomReq, res: Response): Promise<void> => {
  try {

    const { biodata, totalbiodata } = await personalDetailsService.getPublicBiodata(req);

    res.status(200).json({
      success: true,
      totalbiodata,
      data: biodata,
    });
  }catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Failed to fetch data' });
  }
}

const GetPublicBiodataDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const biodata = await personalDetailsService.getPublicBiodataDetails(req);

export const personalDetailsController = {
  Biodata,
  GetBiodata,
  GetPublicBiodata,
};
