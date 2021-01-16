import { productStore } from ".";
import { Product, ProductState } from "../types";
import productModelStore from "./productModelStore";
import Store from "./store";

class ProductStore extends Store<Product> {
  findWithModels(id: string): Promise<ProductState> {
    return new Promise(async (resolve, reject) => {
      try {
        const product = await productStore.findOne(id);
        const productModels = await productModelStore.findByProduct(id);
        resolve({ ...product, productModels });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new ProductStore("ProductStore");
