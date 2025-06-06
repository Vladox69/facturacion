import { createSlice } from "@reduxjs/toolkit";
export const productSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    products: [],
    product: {},
    errorMessage: undefined,
  },
  reducers: {
    onLoadingProduct: (state) => {
      state.isLoading = true;
      state.product = {};
      state.products = [];
      state.errorMessage = undefined;
    },
    onLoadProducts: (state, { payload = [] }) => {
      state.isLoading = false;
      //state.products = payload;
      payload.forEach((product) => {
        const exists = state.products.some(
          (dbProduct) => dbProduct._id === product._id
        );
        if (!exists) {
          state.products.push(product);
        }
      });
    },
    onErrorProduct: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
      state.product = {};
    },
    onErrorProducts: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
      state.product = {};
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  onLoadingProduct,
  onLoadProducts,
  onErrorProduct,
  onErrorProducts,
} = productSlice.actions;
