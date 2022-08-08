import { Request, Response } from 'express';
import OrderService from '../services/order.service';

class OrderController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const allOrders = await this.orderService.getAll();
    res.status(200).json(allOrders);
  };
}

export default OrderController;
