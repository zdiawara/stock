import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductItem, Product } from "../../types";
import { toProductItem } from "../../utils/builder";

type State = {
  products: IProductItem[];
  product?: Product;
};

let initialState = {
  products: [],
  product: undefined,
} as State;

const productState = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(toProductItem(action.payload));
    },
    setProduct: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
      const index = state.products.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index >= 0) {
        state.products[index] = toProductItem(action.payload);
      }
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload.map(toProductItem);
    },
  },
});

export const { addProduct, setProducts, setProduct } = productState.actions;

export const getReducer = (state: any): State => state.product;

export const selectProducts = createSelector(
  getReducer,
  ({ products }) => products
);

export const selectProduct = createSelector(
  getReducer,
  ({ product }) => product
);

export default productState.reducer;
