import { Request, Response } from "express";
import { deleteBiodata } from "../services/deleteBiodata.service";

interface CustomRequest extends Request {
  user: {
    id: string;
  };
}

export const deleteBiodataController = async (req:Request, res:Response) => {
  try {
    const biodataId = (req as CustomRequest).user.id;

    const deletedBiodata = await deleteBiodata(biodataId);

    res.status(200).json({
      message: 'Biodata deleted successfully',
      data: deletedBiodata,
    });
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({
      message: 'Error deleting biodata',
      error: error.message,
    });
  }
}