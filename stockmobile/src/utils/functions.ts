import { ProductModel } from "../types";

export const addNumber = (a: number, b: number) => {
  return parseInt((a || "0").toString()) + parseInt((b || "0").toString());
};

export const computeTotalStock = (products: ProductModel[]) => {
  return products.reduce(
    (acc, prev) => (parseInt(`${prev.stock}`) + acc) as number,
    0
  );
};
