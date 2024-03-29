import { TypeMouvement } from "./enums";
import { Product, ProductModel } from "./models";

export type FieldProps = {
  label: string;
  color?: string;
  position?: any;
};

export interface ProductState extends Product {
  productModels: ProductModel[];
}

export interface IProductItem {
  _id: string;
  name: string;
  stockTotal: number;
}

export type IProductSellState = {
  _id?: string;
  product?: { name: string; _id: string };
  quantity: number;
  total: number;
  price: number;
  discount: number;
};

export interface ISellItem {
  _id: string;
  total: number;
}

export type ProductMouvement = {
  product: Product;
  quantite: number;
  typeMouvement: TypeMouvement;
};
