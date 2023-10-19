import SequelizeUserModel from '../database/models/SequelizeUserModel';
import IUserModel from '../Interfaces/users/IUserModel';
import IUser from '../Interfaces/IUser';

export default class UserModel implements IUserModel {
  private model = SequelizeUserModel;

  async findByEmail(email: string): Promise<IUser | null> {
    return this.model.findOne({ where: { email } });
  }
}
