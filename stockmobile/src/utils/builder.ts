import { IProductItem, ISellItem, Product, SellModel } from "../types";

export const toProductItem = (product: Product): IProductItem => {
  return {
    _id: product._id || "",
    name: product.name,
    stockTotal: product.stock,
  };
};

export const toSellItem = (sell: SellModel): ISellItem => {
  return {
    _id: sell._id || "",
    total: 30089,
  };
};
