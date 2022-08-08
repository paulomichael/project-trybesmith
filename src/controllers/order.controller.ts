import { Request, Response } from 'express';
import OrderService from '../services/order.service';

class OrderController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const allOrders = await this.orderService.getAll();
    console.log('--------> order.controller:allOrders: ', allOrders);
    // console.log('---------> orders: ', orders);
    // fazer busca em Products por orderId
    // select * from Products where orderId = instanceOrderId
    // const orderWithProductId = orders.map()
    // const productIds = this.orderService.getProductIdsByOrderId(orderId);
    // const allOrders = orders.map(async (order) => {
    // const productIds = await this.orderService.getProductIdsByOrderId(order.id);
    //      console.log(`
    //                  order.id: ${order.id}
    //                  user.id: ${order.userId}
    //                  productIds: ${productIds}`);
    // return { productIds };
    // });
    // res.status(200).json(orders);
    res.status(200).json(allOrders);
  };
}

export default OrderController;
