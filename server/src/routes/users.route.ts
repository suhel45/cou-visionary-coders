import express, { Request, Response } from 'express';
import { userController } from '../controllers/user.controller';
import { verifyToken } from '../middleware/authMiddleware';
const router = express.Router();

router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/user', verifyToken, async (req: Request, res: Response) => {
  res.json({ name: 'suhel', id: 5 });
});

export const userRoute = router;
