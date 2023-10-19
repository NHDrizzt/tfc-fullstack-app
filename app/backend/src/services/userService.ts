import * as bcrypt from 'bcryptjs';
import UserModel from '../model/userModel';
import JWT from '../utils/JWT';
import ILogin from '../Interfaces/login/ILogin';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IToken from '../Interfaces/login/IToken';

export default class UserService {
  constructor(private userModel = new UserModel()) {}

  public async login(data: ILogin): Promise<ServiceResponse<IToken>> {
    const user = await this.userModel.findByEmail(data.email);

    if (!user || !bcrypt.compareSync(data.password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const token = JWT.sign({ role: user.role });

    return {
      status: 'SUCCESSFUL',
      data: { token },
    };
  }
}
