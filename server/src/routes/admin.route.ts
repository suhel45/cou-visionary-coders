import express from 'express';
import { isAdmin } from '../middleware/admin.middleware';
import { reportController } from '../controllers/report.controller';
import { verifyToken } from '../middleware/authMiddleware';
import { supportController } from '../controllers/support.controller';
import { getAllPendingVerifications,approveVerification,rejectVerification } from '../controllers/verify.controller';
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
router.get('/all-status',getAllPendingVerifications);
router.post('/verify-approve/:userId',approveVerification);
router.post('/verify-reject/:userId',rejectVerification);

export const adminRoutes = router;
