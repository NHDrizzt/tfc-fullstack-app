import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SequelizeTeamModel from './SequelizeTeamModel';
// import OtherModel from './OtherModel';

class SequelizeMatchesModel extends Model<InferAttributes<SequelizeMatchesModel>,
InferCreationAttributes<SequelizeMatchesModel>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

SequelizeMatchesModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

SequelizeMatchesModel.belongsTo(SequelizeTeamModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });
SequelizeMatchesModel.belongsTo(SequelizeTeamModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });

SequelizeTeamModel
  .hasMany(SequelizeMatchesModel, { foreignKey: 'homeTeamId', as: 'homeMatches' });
SequelizeTeamModel
  .hasMany(SequelizeMatchesModel, { foreignKey: 'awayTeamId', as: 'awayMatches' });

export default SequelizeMatchesModel;
