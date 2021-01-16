import { IProductItem, ProductState } from "../types";
import { computeTotalStock } from "./functions";

export const toProductItem = (product: ProductState): IProductItem => {
  return {
    _id: product._id || "",
    name: product.name,
    stockTotal: computeTotalStock(product.productModels),
  };
};
