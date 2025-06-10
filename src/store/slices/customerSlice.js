import { createSlice } from "@reduxjs/toolkit";
export const customerSlice = createSlice({
  name: "customer",
  initialState: {
    isLoadingCustomer: false,
    customers: [],
    customer: {},
    errorMessageCustomer: undefined,
  },
  reducers: {
    onLoadingCustomer: (state) => {
      state.customers = [];
      state.errorMessageCustomer = undefined;
      state.isLoadingCustomer = true;
      state.customer = {};
    },
    onLoadCustomers: (state, { payload = [] }) => {
      state.isLoadingCustomer = false;
      payload.forEach((customer) => {
        const exists = state.customers.some(
          (dbcustomer) => dbcustomer._id === customer._id
        );
        if (!exists) {
          state.customers.push(customer);
        }
      });
    },
    onLoadCustomer: (state, { payload }) => {
      state.isLoadingCustomer = false;
      state.errorMessageCustomer = undefined;
      state.customer = payload;
    },
    onErrorCustomer: (state, { payload }) => {
      state.isLoadingCustomer = false;
      state.errorMessageCustomer = payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  onErrorCustomer,
  onLoadCustomer,
  onLoadCustomers,
  onLoadingCustomer,
} = customerSlice.actions;
