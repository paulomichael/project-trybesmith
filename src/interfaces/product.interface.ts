export interface IProduct {
  id?: number;
  name: string;
  amount: string;
  // orderId: number | null;
  orderId: number;
}

// export type IProductIds = { productIds: string };
export default IProduct;
