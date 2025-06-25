import { createSlice } from "@reduxjs/toolkit";
export const saleSlice = createSlice({
  name: "sale",
  initialState: {
    isLoadingSales: false,
    sales: [],
    errorMessageSales: undefined,
  },
  reducers: {
    onLoadingSales: (state) => {
      state.isLoadingSales = true;
      state.sales = [];
      state.errorMessageSales = undefined;
    },
    onLoadSales: (state, { payload = [] }) => {
      state.isLoadingSales = false;
      // Ensure no duplicates in sales
      payload.forEach((sale) => {
        const exists = state.sales.some((dbSale) => dbSale._id === sale._id);
        if (!exists) {
          state.sales.push(sale);
        }
      });
    },
    onErrorSales: (state, { payload }) => {
      state.isLoadingSales = false;
      state.errorMessageSales = payload;
      state.sales = [];
    },
  },
});
// Action creators are generated for each case reducer function
export const { onLoadingSales, onErrorSales, onLoadSales } = saleSlice.actions;
