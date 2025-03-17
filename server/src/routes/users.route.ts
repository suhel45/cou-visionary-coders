import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authController } from '../controllers/auth.controller';
import { verifyToken } from '../middleware/authMiddleware';
import { personalDetailsController } from '../controllers/personalAllDetails.controller';
import { PersonalAllDetailsModel } from '../models/PersonalAllDetails.Model';

const router = Router();

router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/login/google', authController.loginWithGoogle);

router.post('/profile/biodata', verifyToken, personalDetailsController.Biodata);

router.get('/get-data', verifyToken, async (req, res) => {
  try {
    const result = await PersonalAllDetailsModel.find({})
      .populate('users')
      .lean() // Convert Mongoose document to a plain JSON object
      .orFail();

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Failed' });
  }
});
router.post('/profile/biodata', verifyToken, personalDetailsController.Biodata);
router.get(
  '/profile/biodata',
  verifyToken,
  personalDetailsController.GetBiodata,
);

export default router;
