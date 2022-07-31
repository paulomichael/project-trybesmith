import connection from '../models/connection';
import UserModel from '../models/user.model';
import IUser from '../interfaces/user.interface';

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  //  public async getAll(): Promise<IUser[]> {
  //    const user = await this.model.getAll();
  //    return user;
  //  }

  public create(user: IUser): Promise<IUser> {
    return this.model.create(user);
  }
}

export default UserService;
