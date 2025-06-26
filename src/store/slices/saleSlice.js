import { createSlice } from "@reduxjs/toolkit";
export const saleSlice = createSlice({
  name: "sale",
  initialState: {
    isLoadingSales: false,
    sales: [],
    topProducts: [],
    topCustomers: [],
    errorMessageSales: undefined,
  },
  reducers: {
    onLoadingSales: (state) => {
      state.isLoadingSales = true;
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
    onLoadCharts: (state, { payload }) => {
      state.isLoadingSales = false;
      const { topProducts = [], topCustomers = [] } = payload;
      topProducts.forEach((product) => {
        const exists = state.topProducts.some(
          (dbProduct) => dbProduct._id === product._id
        );
        if (!exists) {
          state.topProducts.push(product);
        }
      });
      topCustomers.forEach((customer) => {
        const exists = state.topCustomers.some(
          (dbCustomer) => dbCustomer._id === customer._id
        );
        if (!exists) {
          state.topCustomers.push(customer);
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
export const { onLoadingSales, onErrorSales, onLoadSales, onLoadCharts } = saleSlice.actions;
