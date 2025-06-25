import { createSlice } from "@reduxjs/toolkit";
export const PDFSlice = createSlice({
  name: "PDF",
  initialState: {
    isLoadingPDF: false,
    errorMessagePDF: "",
  },
  reducers: {
    onLoadingPDF: (state) => {
      state.isLoadingPDF = true;
      state.errorMessagePDF = "";
    },
    loadPDF: (state) => {
      state.isLoadingPDF = false;
      state.errorMessagePDF = "";
    },
    onErrorPDF: (state, { payload }) => {
      state.isLoadingPDF = false;
      state.errorMessagePDF = payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const { onLoadingPDF, loadPDF, onErrorPDF } = PDFSlice.actions;
