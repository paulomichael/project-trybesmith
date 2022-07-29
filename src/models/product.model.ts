import { Pool, ResultSetHeader } from 'mysql2/promise';
import IProduct from '../interfaces/product.interface';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  //  public async getAll(): Promise<IProduct[]> {
  //    const result = await this.connection
  //      .execute('SELECT * FROM product');
  //    const [rows] = result;
  //    return rows as IProduct[];
  //  }

  public async create(product: IProduct): Promise<IProduct> {
    const { name, amount } = product;
    const query = 'INSERT INTO Trybesmith.Products ( name, amount ) VALUES (?, ?)';
    const values = [name, amount];
    const result = await this.connection.execute<ResultSetHeader>(query, values);
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...product };
  }
}
