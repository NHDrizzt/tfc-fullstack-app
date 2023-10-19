import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';
import { mapStatusHTTP } from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public async getLeaderboard(req: Request, res: Response) {
    const path = req.path === '/home' ? 'home' : 'away';
    const { status, data } = await this.leaderboardService.listAllTeams(path);
    res.status(mapStatusHTTP(status)).json(data);
  }

  public async getGeralLeaderboard(req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.listGeralLeaderboard();
    res.status(mapStatusHTTP(status)).json(data);
  }
}
