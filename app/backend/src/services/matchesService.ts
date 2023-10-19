import MatchesModel from '../model/matchesModel';
import { ServiceResponse, ServiceResponseError } from '../Interfaces/ServiceResponse';
import IMatch from '../Interfaces/IMatch';
import { IMatchData } from '../Interfaces/matches/IMatchesModel';
import TeamModel from '../model/teamModel';

export default class MatchesService {
  constructor(
    private matchesModel = new MatchesModel(),
    private teamModel = new TeamModel(),
  ) {}

  public async listAllMatches(inProgress: string): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchesModel.listAllMatches(inProgress);
    return {
      status: 'SUCCESSFUL',
      data: matches,
    };
  }

  public async finishMatch(matchId: string): Promise<ServiceResponseError> {
    await this.matchesModel.finishMatch(matchId);
    return {
      status: 'SUCCESSFUL',
      data: { message: 'Finalizado' },
    };
  }

  public async updateScore(
    matchId: string,
    homeScore: number,
    awayScore: number,
  ): Promise<ServiceResponseError> {
    await this.matchesModel.updateScore(matchId, homeScore, awayScore);
    return {
      status: 'SUCCESSFUL',
      data: { message: 'Score updated' },
    };
  }

  public async createMatch(matchData: IMatchData): Promise<ServiceResponse<IMatch>> {
    const match = {
      ...matchData,
      inProgress: true,
    };
    const teamsExists = await this.teamModel.checkTeamsExists(match.homeTeamId, match.awayTeamId);
    if (!teamsExists) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' },
      };
    }
    const result = await this.matchesModel.createMatch(match);
    return {
      status: 'CREATED',
      data: result,
    };
  }

  public async listAllFinishedMatches(): Promise<IMatch[]> {
    const matches = await this.matchesModel.listAllMatches('false');
    return matches;
  }
}
