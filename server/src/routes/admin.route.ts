import express from 'express';
import { isAdmin } from '../middleware/admin.middleware';
import { reportController } from '../controllers/report.controller';
const router = express.Router();

router.get('/all-reports',isAdmin,reportController.getAllReports)