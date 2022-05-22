export type Model = {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface Product extends Model {
  name: string;
  price: number;
  stock: number;
  description: string;
  codeBarre: string;
  icon: string;
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

export interface MouvementModel extends Model {
  client: string;
  numero: string;
  date: Date;
}

export interface ProductMouvementModel extends Model {
  product: string;
  sell: string;
  quantity: number;
  total: number;
  discount: number;
}
