import { Product, ProductModel } from "./models";

export type FieldProps = {
  label: string;
  color?: string;
};

export interface ProductState extends Product {
  productModels: ProductModel[];
}

export interface IProductItem {
  _id: string;
  name: string;
  stockTotal: number;
}
