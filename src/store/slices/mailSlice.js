import { createSlice } from "@reduxjs/toolkit";
export const mailSlice = createSlice({
  name: "mail",
  initialState: {
    isSendingMail: false,
    errorMessageMail: undefined,
  },
  reducers: {
    onLoadingMail: (state) => {
      state.isSendingMail = true;
      state.errorMessageMail = undefined;
    },
    onSendMail: (state) => {
      state.isSendingMail = false;
      state.errorMessageMail = undefined;
    },
    onErrorMail: (state, { payload }) => {
      state.isSendingMail = false;
      state.errorMessageMail = payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const { onLoadingMail,onErrorMail,onSendMail } = mailSlice.actions;
