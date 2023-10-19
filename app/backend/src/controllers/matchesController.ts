import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';
import { mapStatusHTTP } from '../utils/mapStatusHTTP';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public async listAllMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    const { status, data } = await this.matchesService.listAllMatches(inProgress as string);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async finishMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.matchesService.finishMatch(id);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async updateScore(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await this.matchesService
      .updateScore(id, homeTeamGoals, awayTeamGoals);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async createMatch(req: Request, res: Response): Promise<Response> {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
    const { status, data } = await this.matchesService
      .createMatch({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress });
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
