import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get(
  '/',
  (req: Request, res: Response) => leaderboardController.getGeralLeaderboard(req, res),
);

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getLeaderboard(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderboardController.getLeaderboard(req, res),
);

export default router;
