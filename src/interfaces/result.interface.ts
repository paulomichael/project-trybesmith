export interface IResultWithoutProductsIdsArray {
  id: number,
  userId: number,
  productsIds: number,
}

export interface IResult {
  id: number,
  userId: number,
  productsIds: number[],
}
