import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authController } from '../controllers/auth.controller';
import { verifyToken } from '../middleware/authMiddleware';
import { personalDetailsController } from '../controllers/personalAllDetails.controller';

const router = Router();

router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/login/google', authController.loginWithGoogle);

router.post('/profile/biodata', verifyToken, personalDetailsController.Biodata);
router.get('/profile/biodata/:id', verifyToken, personalDetailsController.GetBiodata);

export default router;
