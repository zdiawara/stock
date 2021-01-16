import { ProductModel } from "../types";
import Store from "./store";

class ProductStoreModel extends Store<ProductModel> {
  findByProduct(product: string) {
    return this.findAll({ product });
  }
}

export default new ProductStoreModel("ProductStoreModel");
