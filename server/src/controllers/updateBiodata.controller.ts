import { Request, Response } from 'express';

interface CustomRequest extends Request {
  user: {
    id: string;
  };
}

export const updateBiodataController = async (req: Request, res: Response) => {
  const userId = (req as CustomRequest).user.id;
  req.body.users = userId;
  const updateData = req.body;

  try {
    const updatedDocument = await updateBiodata(updateData);

    if (!updatedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.status(200).json(updatedDocument);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update biodata', error: error.message });
  }
};