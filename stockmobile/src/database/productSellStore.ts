import { ProductSellModel } from "../types";
import Store from "./store";

class ProductSellStore extends Store<ProductSellModel> {
  findBySell(sell: string) {
    return this.findAll({ sell });
  }
}

export default new ProductSellStore("ProductSellModel");
