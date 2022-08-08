import { Pool } from 'mysql2/promise';
import { IResult } from '../interfaces/result.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<IResult[]> {
    const query = `
     SELECT O.id, O.userId, json_arrayagg(P.id) as productsIds
      FROM Trybesmith.Orders as O, Trybesmith.Products as P
      WHERE O.id = P.orderId
      GROUP BY O.id
      ORDER BY O.userId;
`;

    const [result] = await this.connection.execute(query);
    return result as IResult[];
  }
}
