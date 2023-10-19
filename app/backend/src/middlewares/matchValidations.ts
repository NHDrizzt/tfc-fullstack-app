import { NextFunction, Request, Response } from 'express';
import { mapStatusHTTP } from '../utils/mapStatusHTTP';

export default class MatchValidations {
  static validateMatchData(req: Request, res: Response, next: NextFunction): Response | void {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(mapStatusHTTP('INVALID_VALUE'))
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  }
}
