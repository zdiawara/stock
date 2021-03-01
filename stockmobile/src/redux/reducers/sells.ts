import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductItem, ISellItem, Product, SellModel } from "../../types";
import { toProductItem } from "../../utils/builder";

type State = {
  sells: ISellItem[];
  sell?: SellModel;
};

let initialState = {
  sells: [],
  sell: undefined,
} as State;

const sellState = createSlice({
  name: "sells",
  initialState,
  reducers: {
    addSell: (state, action: PayloadAction<ISellItem>) => {
      state.sells.push(action.payload);
    },
    // setProduct: (state, action: PayloadAction<Product>) => {
    //   state.product = action.payload;
    //   const index = state.products.findIndex(
    //     (item) => item._id === action.payload._id
    //   );
    //   if (index >= 0) {
    //     state.products[index] = toProductItem(action.payload);
    //   }
    // },
    setSells: (state, action: PayloadAction<ISellItem[]>) => {
      state.sells = action.payload;
    },
  },
});

export const { addSell, setSells } = sellState.actions;

export const getReducer = (state: any): State => state.sell;

export const selectSells = createSelector(getReducer, ({ sells }) => sells);

export default sellState.reducer;
