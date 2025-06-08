import { createSlice } from "@reduxjs/toolkit";
export const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    isSaving: false,
    invoiceData: null,
    errorMessageInvoice: undefined,
    successMessage: undefined,
  },
  reducers: {
    onSavingInvoice: (state) => {
      state.isSaving = true;
      state.errorMessageInvoice = undefined;
      state.successMessage = undefined;
    },
    onSaveInvoiceSuccess: (state, { payload }) => {
      state.isSaving = false;
      state.invoiceData = payload;
      state.successMessage = "Factura creada exitosamente";
    },
    onSaveInvoiceError: (state, { payload }) => {
      state.isSaving = false;
      state.errorMessage = payload;
    },
    clearInvoiceMessages: (state) => {
      state.successMessage = undefined;
      state.errorMessage = undefined;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  onSavingInvoice,
  onSaveInvoiceSuccess,
  onSaveInvoiceError,
  clearInvoiceMessages,
} = invoiceSlice.actions;
