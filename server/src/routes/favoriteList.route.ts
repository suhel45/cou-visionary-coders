import express from 'express';
import { verifyToken } from '../middleware/authMiddleware';
import { favoriteListController } from '../controllers/favoriteList.controller';
const router = express.Router();

router.post(
  '/favoriteList',
  verifyToken,
  favoriteListController.addToFavorites,
);
router.delete(
  '/favoriteList/:biodataId',
  verifyToken,
  favoriteListController.removeFromFavorites,
);
router.get(
  '/favoriteList',
  verifyToken,
  favoriteListController.getFavoritesList,
);

export const favoriteRoutes = router;
