import { createSlice } from "@reduxjs/toolkit";
export const productSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    products: [],
    filteredProducts: [],
    product: {},
    errorMessage: undefined,
  },
  reducers: {
    onLoadingProduct: (state) => {
      state.isLoading = true;
      state.product = {};
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
    setFilteredProducts:(state,{payload=[]})=>{
      state.isLoading = false;
      state.filteredProducts = payload;
      state.errorMessage = undefined;
    },
    clearFilteredProducts:(state)=>{
      state.isLoading = false;
      state.filteredProducts = [];
      state.errorMessage = undefined;
    },
    onErrorProduct: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
      state.product = {};
    },
    onErrorProducts: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  onLoadingProduct,
  onLoadProducts,
  onErrorProduct,
  onErrorProducts,
  setFilteredProducts,
  clearFilteredProducts
} = productSlice.actions;
