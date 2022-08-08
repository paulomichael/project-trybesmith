import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IProduct } from '../interfaces/product.interface';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<IProduct[]> {
    const query = 'SELECT * FROM Trybesmith.Products';
    const result = await this.connection
      .execute(query);
    const [rows] = result;
    return rows as IProduct[];
  }

  public async create(product: IProduct): Promise<IProduct> {
    const { name, amount } = product;
    const query = 'INSERT INTO Trybesmith.Products ( name, amount ) VALUES (?, ?)';
    const values = [name, amount];
    const result = await this.connection.execute<ResultSetHeader>(query, values);
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...product };
  }

  async getById(id:number):Promise<IProduct[]> {
    // fonte: https://www.mysqltutorial.org/mysql-group_concat/
    const query = 'SELECT group_concat(id) as productsIds FROM Trybesmith.Products where orderId=?';
    const [result] = await this.connection.execute(query, [id]);
    return result as [IProduct];
  }

  public async getProductIdsByOrderId(orderId: number): Promise<IProduct[]> {
    const query = 'SELECT id FROM Trybesmith.Products where orderId = ?';
    const values = [orderId];
    const result = await this.connection.execute(query, values);
    const [rows] = result;
    console.log('---------> product.model:getProductIdsByOrderId:rows: ', rows);
    return rows as IProduct[];
  }
}
