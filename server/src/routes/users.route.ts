import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authController } from '../controllers/auth.controller';
import { verifyToken } from '../middleware/authMiddleware';
import { personalDetailsController } from '../controllers/personalAllDetails.controller';
import { upload } from '../middleware/verify.middleware';
import { checkVerificationStatus, uploadIDCard } from '../controllers/verify.controller';

const router = Router();

router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/login/google', authController.loginWithGoogle);
router.patch('/reset-password', verifyToken, userController.resetPassword);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password/:token', userController.resetPasswordWithToken);

router.post('/profile/biodata', verifyToken, personalDetailsController.Biodata);
router.get(
  '/profile/biodata',
  verifyToken,
  personalDetailsController.GetBiodata,
);
router.get(
  '/profile/biodata/:id',
  personalDetailsController.GetPublicBiodataDetails,
);
router.get('/biodata', personalDetailsController.GetPublicBiodata);
router.get('/identity/status',verifyToken,checkVerificationStatus);

router.post('/upload',verifyToken, upload.single('studentId'), uploadIDCard);
export default router;
