import connection from '../models/connection';
import ProductModel from '../models/product.model';
import IProduct from '../interfaces/product.interface';

class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async getAll(): Promise<IProduct[]> {
    const product = await this.model.getAll();
    return product;
  }

  public create(product: IProduct): Promise<IProduct> {
    return this.model.create(product);
  }
}

export default ProductService;
