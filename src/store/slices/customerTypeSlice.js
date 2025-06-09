import { createSlice } from "@reduxjs/toolkit";
export const customerTypeSlice = createSlice({
  name: "customerType",
  initialState: {
    isLoadingCustomerTypes: false,
    customerTypes: [],
    errorMessageCustomerType: undefined,
  },
  reducers: {
    onLoadingCustomerTypes: (state) => {
      state.customerTypes = [];
      state.errorMessageCustomerType = undefined;
      state.isLoadingCustomerTypes = true;
    },
    onLoadCustomerTypes: (state, { payload = [] }) => {
      state.isLoadingCustomerTypes = false;
      payload.forEach((customerType) => {
        const exists = state.customerTypes.some(
          (dbcustomerType) => dbcustomerType._id === customerType._id
        );
        if (!exists) {
          state.customerTypes.push(customerType);
        }
      });
    },
    onErrorCustomerTypes: (state, { payload }) => {
      state.isLoadingCustomerTypes = false;
      state.errorMessageCustomerType = payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  onLoadingCustomerTypes,
  onErrorCustomerTypes,
  onLoadCustomerTypes,
} = customerTypeSlice.actions;
