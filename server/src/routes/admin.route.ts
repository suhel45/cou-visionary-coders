import express from 'express';
import { isAdmin } from '../middleware/admin.middleware';
import { reportController } from '../controllers/report.controller';
import { verifyToken } from '../middleware/authMiddleware';
const router = express.Router();

router.get('/all-reports',verifyToken, isAdmin,reportController.getAllReports);