import { Request, Response } from 'express';
import { personalDetailsService } from '../services/personalAllDetails.service';

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
    const id = req.params.id;
    const result = await personalDetailsService.getBiodata(id);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed' });
  }
}

export const personalDetailsController = {
  Biodata,
};
