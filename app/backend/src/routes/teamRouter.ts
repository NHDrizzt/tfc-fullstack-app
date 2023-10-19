import { Request, Router, Response } from 'express';
import TeamController from '../controllers/teamController';

const router = Router();

const teamController = new TeamController();

router.get('/', (req: Request, res: Response) => teamController.getAll(req, res));
router.get('/:id', (req: Request, res: Response) => teamController.getById(req, res));

export default router;
