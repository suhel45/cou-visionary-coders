import express from 'express';
import { verifyToken } from '../middleware/authMiddleware';
import { supportController } from '../controllers/support.controller';
const router = express.Router();

router.post('/support', verifyToken, supportController.addToSupport);

export const supportRoutes = router;
