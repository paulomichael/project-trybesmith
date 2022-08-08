import connection from '../models/connection';
import OrderModel from '../models/order.model';
import ProductModel from '../models/product.model';
import { IResult } from '../interfaces/result.interface';

class OrderService {
  public model: OrderModel;

  public productModel: ProductModel;

  constructor() {
    this.model = new OrderModel(connection);
    this.productModel = new ProductModel(connection);
  }

  public async getAll(): Promise<IResult[]> {
    const allOrders = await this.model.getAll();
    const allResults = allOrders.map((item) => ({
      id: item.id,
      userId: item.userId,
      productsIds: item.productsIds }));
    return allResults;
  }
}

export default OrderService;
