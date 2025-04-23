import express from 'express';
import { isAdmin } from '../middleware/admin.middleware';
import { reportController } from '../controllers/report.controller';
import { verifyToken } from '../middleware/authMiddleware';
import { supportController } from '../controllers/support.controller';
const router = express.Router();

router.get(
  '/all-reports',
  verifyToken,
  isAdmin,
  reportController.getAllReports,
);
router.get(
  '/all-support',
  verifyToken,
  isAdmin,
  supportController.getSupportList,
);

export const adminRoutes = router;
