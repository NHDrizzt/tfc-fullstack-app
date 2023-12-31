export default interface ILeaderboard {
  'name': string,
  'totalPoints': number,
  'totalGames': number,
  'totalVictories': number,
  'totalDraws': number,
  'totalLosses': number,
  'goalsFavor': number,
  'goalsOwn': number,
}

export interface ILeaderboardTeam extends ILeaderboard {
  goalsBalance: number,
  efficiency: number,
}
