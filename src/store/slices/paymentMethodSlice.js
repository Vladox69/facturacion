import { createSlice } from "@reduxjs/toolkit";
export const paymentMethodSlice = createSlice({
  name: "paymentMethod",
  initialState: {
    isLoadingPaymentMethod: false,
    paymentMethods: [],
    errorMessagePaymentMethod: undefined,
  },
  reducers: {
    onLoadingPaymentMethods: (state) => {
      state.isLoadingPaymentMethod = true;
      state.paymentMethods = [];
      state.errorMessagePaymentMethod = undefined;
    },
    onLoadPaymentMethods: (state, { payload = [] }) => {
      state.isLoadingPaymentMethod = false;
      payload.forEach((payment) => {
        const exists = state.paymentMethods.some(
          (dbPayment) => dbPayment._id === payment._id
        );
        if (!exists) {
          state.paymentMethods.push(payment);
        }
      });
    },
    onErrorPaymentMethods: (state, { payload }) => {
      state.isLoadingPaymentMethod = false;
      state.errorMessagePaymentMethod = payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  onLoadingPaymentMethods,
  onLoadPaymentMethods,
  onErrorPaymentMethods,
} = paymentMethodSlice.actions;
