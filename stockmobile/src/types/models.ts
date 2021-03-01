export type Model = {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface Product extends Model {
  name: string;
  price: number;
  stock: number;
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
  product: string;
  sell: string;
  quantity: number;
  total: number;
  discount: number;
}
