import { Request, Response } from 'express';
import TeamService from '../services/teamService';
import { mapStatusHTTP } from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  public async getAll(req: Request, res: Response) {
    const response = await this.teamService.getAll();
    res.status(mapStatusHTTP(response.status)).json(response.data);
  }

  public async getById(req: Request, res: Response) {
    const response = await this.teamService.getById(Number(req.params.id));
    res.status(mapStatusHTTP(response.status)).json(response.data);
  }
}
