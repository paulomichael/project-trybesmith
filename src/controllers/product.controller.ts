import { Request, Response } from 'express';
// import { StatusCodes } from 'http-status-codes';
import ProductService from '../services/product.service';

class ProductController {
  constructor(private productService = new ProductService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const products = await this.productService.getAll();
    res.status(200).json(products);
  };
  
  public create = async (req: Request, res: Response) => {
    const product = req.body;
    const productCreated = await this.productService.create(product);
    // res.status(StatusCodes.CREATED).json(productCreated);
    res.status(201).json(productCreated);
  };
}

export default ProductController;
