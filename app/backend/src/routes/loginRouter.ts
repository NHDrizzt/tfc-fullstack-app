import { Request, Router, Response } from 'express';
import UserController from '../controllers/userController';
import LoginValidations from '../middlewares/loginValidations';
import JwtValidations from '../middlewares/jwtValidations';

const router = Router();

const userController = new UserController();

router.post(
  '/',
  LoginValidations.validateLoginFields,
  (req: Request, res: Response) => userController.login(req, res),
);

router.get('/role', JwtValidations.validateToken);

export default router;
