import { createSlice } from "@reduxjs/toolkit";
export const SRISlice = createSlice({
  name: "SRI",
  initialState: {
    messageReception: "",
    messageAuthorization: "",
    isLoadingSRI: false,
    errorMessageSRI: "",
  },
  reducers: {
    onLoadingSRI: (state) => {
      state.isLoadingSRI = true;
      state.errorMessageSRI = "";
      state.messageReception = "";
      state.messageAuthorization = "";
    },
    setMessageReception: (state, { payload }) => {
      state.isLoadingSRI = false;
      state.errorMessageSRI = "";
      state.messageReception = payload;
    },
    setMessageAuthorization: (state, { payload }) => {
      state.isLoadingSRI = false;
      state.errorMessageSRI = "";
      state.messageAuthorization = payload;
    },
    clearMessagesSRI: (state) => {
      state.isLoadingSRI = false;
      state.errorMessageSRI = "";
      state.messageReception = "";
      state.messageAuthorization = "";
    },
    onErrorSRI: (state, { payload }) => {
      state.isLoadingSRI = false;
      state.errorMessageSRI = payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  setMessageReception,
  setMessageAuthorization,
  clearMessagesSRI,
  onLoadingSRI,
  onErrorSRI,
} = SRISlice.actions;
