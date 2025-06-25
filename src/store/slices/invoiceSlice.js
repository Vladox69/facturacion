import { createSlice } from "@reduxjs/toolkit";
export const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    isSavingInvoice: false,
    invoiceData: {},
    invoiceHTML:{},
    errorMessageInvoice: undefined,
    successMessageInvoice: undefined,
  },
  reducers: {
    onSavingInvoice: (state) => {
      state.isSavingInvoice = true;
      state.errorMessageInvoice = undefined;
      state.successMessageInvoice = undefined;
    },
    onSaveInvoiceSuccess: (state, { payload }) => {
      state.isSavingInvoice = false;
      state.invoiceData = payload;
      state.successMessageInvoice = "Factura creada exitosamente";
    },
    setInvoiceHTML: (state, { payload }) => {
      state.invoiceHTML = payload;
    },
    onSaveInvoiceError: (state, { payload }) => {
      state.isSavingInvoice = false;
      state.errorMessageInvoice = payload;
    },
    clearInvoiceMessages: (state) => {
      state.successMessageInvoice = undefined;
      state.errorMessageInvoice = undefined;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  onSavingInvoice,
  onSaveInvoiceSuccess,
  onSaveInvoiceError,
  clearInvoiceMessages,
  setInvoiceHTML,
} = invoiceSlice.actions;
