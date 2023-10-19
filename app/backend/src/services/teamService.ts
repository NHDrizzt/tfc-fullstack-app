import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ITeam from '../Interfaces/ITeam';
import TeamModel from '../model/teamModel';

export default class TeamService {
  constructor(private teamModel = new TeamModel()) {}

  public async getAll(): Promise<ServiceResponse<ITeam[]>> {
    const teams = await this.teamModel.findAll();
    return {
      status: 'SUCCESSFUL',
      data: teams,
    };
  }

  public async getAllTeams(): Promise<ITeam[]> {
    const teams = await this.teamModel.findAll();
    return teams;
  }

  public async getById(id: number): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.findById(id);

    if (!team) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'Team not found' },
      };
    }

    return {
      status: 'SUCCESSFUL',
      data: team,
    };
  }
}
