import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/matchesController';
import JwtValidations from '../middlewares/jwtValidations';
import MatchValidations from '../middlewares/matchValidations';

const router = Router();

const matchesController = new MatchesController();

router.get(
  '/',
  (req: Request, res: Response) => matchesController.listAllMatches(req, res),
);

router.patch(
  '/:id/finish',
  (req, res, next) => JwtValidations.validateToken(req, res, next, false),
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);

router.patch(
  '/:id',
  (req, res, next) => JwtValidations.validateToken(req, res, next, false),
  (req: Request, res: Response) => matchesController.updateScore(req, res),
);

router.post(
  '/',
  (req, res, next) => JwtValidations.validateToken(req, res, next, false),
  (req, res, next) => MatchValidations.validateMatchData(req, res, next),
  (req: Request, res: Response) => matchesController.createMatch(req, res),
);

export default router;
