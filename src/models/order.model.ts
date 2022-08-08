// import { Pool, ResultSetHeader } from 'mysql2/promise';
import { Pool } from 'mysql2/promise';
// import IOrder from '../interfaces/order.interface';
import { IResultWithoutProductsIdsArray } from '../interfaces/result.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  //  public async getAll():Promise<IOrder[]> {
  //    const query = 'SELECT * FROM Trybesmith.Orders;';
  //    const [result] = await this.connection.execute(query);
  //    return result as IOrder[];
  //  }
  
  public async getAll(): Promise<IResultWithoutProductsIdsArray[]> {
  // public async getAll(): Promise<IResult[]> {

    //  const query = `
    //      select 
    //        O.id,
    //        O.userId,
    //        P.id
    //      from Trybesmith.Orders as O
    //      inner join Trybesmith.Products as P
    //        on P.orderId = O.id
    //      ;`;
    //    const query = `
    //      SELECT ord.id, ord.userId, pro.id as productsIds FROM Trybesmith.Orders AS ord
    //      INNER JOIN Trybesmith.Users as us
    //      ON us.id = ord.userId
    //      INNER JOIN Trybesmith.Products as pro
    //      ON pro.orderId = ord.id;`;

    // SELECT O.id, O.userId, convert(GROUP_CONCAT(P.id), UNSIGNED) as productsIds
    // SELECT O.id, O.userId, json_arrayagg(P.id) as productsIds
    // SELECT O.id, O.userId, json_arrayagg(convert(GROUP_CONCAT(P.id), UNSIGNED)) as productsIds
    
    //    const query = `
    //    SELECT O.id, O.userId, json_arrayagg(convert(GROUP_CONCAT(P.id), UNSIGNED)) as productsIds
    //    FROM Trybesmith.Orders as O, Trybesmith.Products as P
    //    WHERE O.id = P.orderId
    //    GROUP BY O.id;
    //    `;

    const query = `
        SELECT ord.id, ord.userId, pro.id as productsIds FROM Trybesmith.Orders AS ord
        INNER JOIN Trybesmith.Users as us
        ON us.id = ord.userId
        INNER JOIN Trybesmith.Products as pro
        ON pro.orderId = ord.id;`;

    const [result] = await this.connection.execute(query);
    console.log('-------> order.model:result: ', result);
    return result as IResultWithoutProductsIdsArray[];
  //    const result = await this.connection.execute(query);
  //    const [rows] = result;
  //    return rows as IResult[];
  }
}
