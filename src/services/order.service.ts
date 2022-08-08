import connection from '../models/connection';
import OrderModel from '../models/order.model';
import ProductModel from '../models/product.model';
// import IOrder from '../interfaces/order.interface';
// import IProduct from '../interfaces/product.interface';
// import { IProductIds } from '../interfaces/product.interface';
import { IResult } from '../interfaces/result.interface';

class OrderService {
  public model: OrderModel;

  public productModel: ProductModel;

  constructor() {
    this.model = new OrderModel(connection);
    this.productModel = new ProductModel(connection);
  }

  //  public async getAll():Promise<IResult[]> {
  //    const orders = await this.model.getAll();
  //    const getProductId = await Promise.all(
  //      orders.map(async (order) => {
  //        const arrayIds = await this.productModel.getById(order.id);
  //        const ids = arrayIds[0].productIds.split(',');
  //        const numberIds = ids.map((id) => +id);
  //        return { ...order, productsIds: numberIds };
  //      }),
  //    );
  //    return getProductId;
  //  }
  
  // public async getAll(): Promise<IProduct[]> {

  // public async getAll(): Promise<IResult[]> {
  public async getAll(): Promise<IResult[]> {
    const allOrders = await this.model.getAll();
    const intermediateResult = {} as { [key: number]: IResult };
    allOrders.forEach((order) => {
      if (intermediateResult[order.id]) {
        intermediateResult[order.id] = {
          ...order, productsIds: [...intermediateResult[order.id].productsIds, order.productsIds],
        };
      } else {
        intermediateResult[order.id] = { 
          id: order.id, userId: order.userId, productsIds: [order.productsIds], 
        };
      }
    });
    console.log('------> intermediateResult:', intermediateResult);
    const result = Object.values(intermediateResult as IResult[])
      .sort((a, b) => a.userId - b.userId);
    return result;
  }
  //
  // console.log
  //  ----> order.service: allOrders: [
  //    BinaryRow { id: 1, userId: 1, productsIds: 2 },
  //    BinaryRow { id: 3, userId: 2, productsIds: 5 },
  //    BinaryRow { id: 2, userId: 3, productsIds: 3 },
  //    BinaryRow { id: 2, userId: 3, productsIds: 4 }
  //  ]

  //    at OrderService.<anonymous> (../src/services/order.service.ts:36:13)

  // console.log
  //  --------> order.controller:allOrders:  [
  //    { id: 1, userId: 1, productsIds: [] },
  //    { id: 3, userId: 2, productsIds: [] },
  //    { id: 2, userId: 3, productsIds: [] },
  //    { id: 2, userId: 3, productsIds: [] }
  //  ]

  //  public async getAll(): Promise<IResult[]> {
  //    const allOrders = await this.model.getAll();
  //    console.log('----> order.service: allOrders:', allOrders);
  //    const allResults = allOrders.map((item) => ({
  //      id: item.id,
  //      userId: item.userId,
  //      productsIds: [...item.productsIds] }));
  //    return allResults;
  //  }
}

export default OrderService;
