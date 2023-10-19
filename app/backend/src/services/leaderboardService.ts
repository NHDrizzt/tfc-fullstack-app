import TeamService from './teamService';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ILeaderboard, { ILeaderboardTeam } from '../Interfaces/ILeaderboard';
import MatchesService from './matchesService';
import IMatch from '../Interfaces/IMatch';
import ITeam from '../Interfaces/ITeam';

export default class LeaderboardService {
  constructor(
    private teamService = new TeamService(),
    private matchService = new MatchesService(),
  ) {
  }

  private static isHomeTeam(updatedPoints: ILeaderboard, match: IMatch): ILeaderboard {
    const newPoints = { ...updatedPoints };
    newPoints.totalVictories = match.homeTeamGoals > match.awayTeamGoals ? 1 : 0;
    newPoints.totalDraws = match.homeTeamGoals === match.awayTeamGoals ? 1 : 0;
    newPoints.totalLosses = match.homeTeamGoals < match.awayTeamGoals ? 1 : 0;
    newPoints.totalPoints = newPoints.totalVictories * 3 + newPoints.totalDraws;
    newPoints.totalGames = 1;
    newPoints.goalsFavor = match.homeTeamGoals;
    newPoints.goalsOwn = match.awayTeamGoals;
    return newPoints;
  }

  private static isAwayTeam(updatedPoints: ILeaderboard, match: IMatch): ILeaderboard {
    const newPoints = { ...updatedPoints };
    newPoints.totalVictories = match.awayTeamGoals > match.homeTeamGoals ? 1 : 0;
    newPoints.totalDraws = match.awayTeamGoals === match.homeTeamGoals ? 1 : 0;
    newPoints.totalLosses = match.awayTeamGoals < match.homeTeamGoals ? 1 : 0;
    newPoints.totalPoints = newPoints.totalVictories * 3 + newPoints.totalDraws;
    newPoints.totalGames = 1;
    newPoints.goalsFavor = match.awayTeamGoals;
    newPoints.goalsOwn = match.homeTeamGoals;
    return newPoints;
  }

  private static calculatePoints(
    match: IMatch,
    points: ILeaderboard,
    teamId: number,
    path: string,
  ): ILeaderboard {
    let updatedPoints = { ...points };
    if (teamId === match.homeTeamId && path === 'home') {
      updatedPoints = LeaderboardService.isHomeTeam(updatedPoints, match);
    } else if (teamId === match.awayTeamId && path === 'away') {
      updatedPoints = LeaderboardService.isAwayTeam(updatedPoints, match);
    }
    return updatedPoints;
  }

  private static accumulatePoints(points: ILeaderboard[], teamName: string): ILeaderboard {
    return points.reduce((acc, curr) => {
      acc.totalPoints += curr.totalPoints;
      acc.totalGames += curr.totalGames;
      acc.totalVictories += curr.totalVictories;
      acc.totalDraws += curr.totalDraws;
      acc.totalLosses += curr.totalLosses;
      acc.goalsFavor += curr.goalsFavor;
      acc.goalsOwn += curr.goalsOwn;
      return acc;
    }, LeaderboardService.newTeam(teamName));
  }

  async listAllTeams(path: string): Promise<ServiceResponse<ILeaderboard[]>> {
    const matches = await this.matchService.listAllFinishedMatches();
    const teams = await this.teamService.getAllTeams();
    const teamsWithPoints = teams.map((team) => {
      const points: ILeaderboard = LeaderboardService.newTeam(team.teamName);
      const cp = matches.map((match) => LeaderboardService
        .calculatePoints(match, points, team.id, path));
      const teamCalc = LeaderboardService.accumulatePoints(cp, team.teamName);
      return {
        ...teamCalc,
        goalsBalance: teamCalc.goalsFavor - teamCalc.goalsOwn,
        efficiency: Number(((teamCalc.totalPoints / (teamCalc.totalGames * 3)) * 100)
          .toFixed(2)),
      };
    });
    const sortedTeams = LeaderboardService.sortTeams(teamsWithPoints);
    return { status: 'SUCCESSFUL', data: sortedTeams };
  }

  async listGeralLeaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const matches = await this.matchService.listAllFinishedMatches();
    const teams = await this.teamService.getAllTeams();
    const teamsLoop = teams.map((team) => {
      const cp = LeaderboardService.reduceGeralTeams(matches, team);

      return {
        ...cp,
        totalPoints: cp.totalVictories * 3 + cp.totalDraws,
        goalsBalance: cp.goalsFavor - cp.goalsOwn,
        efficiency: Number((((cp.totalVictories * 3 + cp.totalDraws) / (cp.totalGames * 3)) * 100)
          .toFixed(2)),
      };
    });
    const sortedTeams = LeaderboardService.sortTeams(teamsLoop);
    return { status: 'SUCCESSFUL', data: sortedTeams };
  }

  private static reduceGeralTeams(matches: IMatch[], team: ITeam): ILeaderboard {
    return matches.reduce((acc, curr) => {
      if (team.id === curr.homeTeamId) {
        this.calculateHomeTeamStats(acc, curr);
      } else if (team.id === curr.awayTeamId) {
        this.calculateAwayTeamStats(acc, curr);
      }
      return acc;
    }, LeaderboardService.newTeam(team.teamName));
  }

  private static calculateHomeTeamStats(acc: ILeaderboard, curr: IMatch): void {
    acc.totalGames += 1;
    acc.totalVictories += curr.homeTeamGoals > curr.awayTeamGoals ? 1 : 0;
    acc.totalDraws += curr.homeTeamGoals === curr.awayTeamGoals ? 1 : 0;
    acc.totalLosses += curr.homeTeamGoals < curr.awayTeamGoals ? 1 : 0;
    acc.goalsFavor += curr.homeTeamGoals;
    acc.goalsOwn += curr.awayTeamGoals;
  }

  private static calculateAwayTeamStats(acc: ILeaderboard, curr: IMatch): void {
    acc.totalGames += 1;
    acc.totalVictories += curr.awayTeamGoals > curr.homeTeamGoals ? 1 : 0;
    acc.totalDraws += curr.awayTeamGoals === curr.homeTeamGoals ? 1 : 0;
    acc.totalLosses += curr.awayTeamGoals < curr.homeTeamGoals ? 1 : 0;
    acc.goalsFavor += curr.awayTeamGoals;
    acc.goalsOwn += curr.homeTeamGoals;
  }

  private static sortTeams(teams: ILeaderboardTeam[]): ILeaderboardTeam[] {
    return teams.sort((a, b) => b.totalPoints - a.totalPoints
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor);
  }

  private static newTeam(teamName: string): ILeaderboard {
    return ({
      name: teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
    });
  }
}
