export type Model = {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface Product extends Model {
  name: string;
}

export interface ProductModel extends Model {
  name: string;
  price: number;
  stock: number;
  product: string;
}

export interface SellModel extends Model {
  client: string;
}

export interface ProductSellModel extends Model {
  quantity: number;
  discount: number;
  price: number;
  rest: number;
  productModel: string;
  sell: string;
}
