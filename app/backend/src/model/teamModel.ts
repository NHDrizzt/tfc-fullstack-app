import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import ITeam from '../Interfaces/ITeam';
import SequelizeTeamModel from '../database/models/SequelizeTeamModel';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeamModel;

  async findAll(): Promise<ITeam[]> {
    return this.model.findAll();
  }

  async findById(id: number): Promise<ITeam | null> {
    return this.model.findByPk(id);
  }

  async checkTeamsExists(homeTeamId: number, awayTeamId: number) {
    const homeTeam = await this.model.findByPk(homeTeamId);
    const awayTeam = await this.model.findByPk(awayTeamId);
    return !(!homeTeam || !awayTeam);
  }
}
