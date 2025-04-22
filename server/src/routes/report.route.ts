import express from 'express';
import { verifyToken } from '../middleware/authMiddleware';
import { reportController } from '../controllers/report.controller';
const router = express.Router();

router.post('/report', verifyToken, reportController.createReport);

export const reportRoutes = router;
