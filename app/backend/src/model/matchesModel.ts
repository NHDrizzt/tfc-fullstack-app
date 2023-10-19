import IMatchesModel, { IMatchData } from '../Interfaces/matches/IMatchesModel';
import IMatch from '../Interfaces/IMatch';
import SequelizeMatchesModel from '../database/models/SequelizeMatchesModel';
import SequelizeTeamModel from '../database/models/SequelizeTeamModel';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatchesModel;

  async listAllMatches(inProgress: string): Promise<IMatch[]> {
    const allMatches = {
      include: [
        { model: SequelizeTeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: {},
    };

    if (inProgress === 'true') {
      allMatches.where = { inProgress: true };
    } else if (inProgress === 'false') {
      allMatches.where = { inProgress: false };
    }
    return this.model.findAll(allMatches);
  }

  async finishMatch(matchId: string): Promise<void> {
    const match = await this.model
      .update({ inProgress: false }, { where: { id: matchId } });
    if (!match) {
      throw new Error('Match not found');
    }
  }

  async updateScore(matchId: string, homeScore: number, awayScore: number): Promise<void> {
    const match = await this.model
      .update({ homeTeamGoals: homeScore, awayTeamGoals: awayScore }, { where: { id: matchId } });
    if (!match) {
      throw new Error('Match not found');
    }
  }

  async createMatch(matchData: IMatchData): Promise<IMatch> {
    return this.model.create(matchData);
  }
}
