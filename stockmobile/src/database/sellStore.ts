import { SellModel } from "../types";
import Store from "./store";

class SellStore extends Store<SellModel> {}

export default new SellStore("SellStore");
