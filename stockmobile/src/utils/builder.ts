import { IProductItem, Product } from "../types";

export const toProductItem = (product: Product): IProductItem => {
  return {
    _id: product._id || "",
    name: product.name,
    stockTotal: product.stock,
  };
};
