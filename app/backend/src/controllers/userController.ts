import { Request, Response } from 'express';
import { mapStatusHTTP } from '../utils/mapStatusHTTP';
import UserService from '../services/userService';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) {}

  public async login(req: Request, res: Response) {
    const user = await this.userService.login(req.body);
    res.status(mapStatusHTTP(user.status)).json(user.data);
  }
}
