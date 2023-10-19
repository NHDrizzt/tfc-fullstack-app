import IMatch from '../IMatch';

export default interface IMatchesModel {
  listAllMatches: (inProgress: string) => Promise<IMatch[]>;
  finishMatch: (matchId: string) => Promise<void>;
  updateScore: (matchId: string, homeScore: number, awayScore: number) => Promise<void>;
  createMatch: (matchData: IMatchData) => Promise<IMatch>;
}

interface IMatchData {
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export { IMatchData };
