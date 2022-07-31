import { Pool, ResultSetHeader } from 'mysql2/promise';
import IUser from '../interfaces/user.interface';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  //  public async getAll(): Promise<IUser[]> {
  //    const result = await this.connection
  //      .execute('SELECT * FROM Trybesmith.Users');
  //    const [rows] = result;
  //    return rows as IUser[];
  //  }

  public async create(user: IUser): Promise<IUser> {
    const { username, classe, level, password } = user;
    const query = `
    INSERT INTO Trybesmith.Users ( username, classe, level, password )
    VALUES (?, ?, ?, ?)`;
    const values = [username, classe, level, password];
    const result = await this.connection.execute<ResultSetHeader>(query, values);
    const dataInserted = result[0];
    const { insertId } = dataInserted;
    return { id: insertId, ...user };
  }
}
