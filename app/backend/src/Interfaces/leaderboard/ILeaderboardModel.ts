import ILeaderboard from '../ILeaderboard';

export default interface ILeaderboardModel {
  listAllTeams: (inProgress: string) => Promise<ILeaderboard[]>;
}
