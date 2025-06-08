import { createSlice } from "@reduxjs/toolkit";
export const businessSlice = createSlice({
  name: "business",
  initialState: {
    isLoadedBusiness: false,
    business: {},
    errorMessageBusiness: undefined,
  },
  reducers: {
    onLoadingBusiness: (state) => {
      state.isLoadedBusiness = false;
      state.business = {};
      state.errorMessageBusiness = undefined;
    },
    setBusinessData: (state, { payload }) => {
      state.business = payload;
      state.isLoadedBusiness = true;
      state.errorMessageBusiness = undefined;
      localStorage.setItem("business", JSON.stringify(payload));
    },
    loadBusinessFromStorage: (state) => {
      const storedData = localStorage.getItem("business");
      if (storedData) {
        state.business = JSON.parse(storedData);
        state.isLoadedBusiness = true;
      }
    },
    clearBusinessData: (state) => {
      state.business = {};
      state.isLoadedBusiness = false;
      localStorage.removeItem("business");
    },
    onErrorBusiness:(state,{payload})=>{
        state.isLoadedBusiness=false;
        state.errorMessageBusiness = payload;
        state.business = {};
    }
  },
});
// Action creators are generated for each case reducer function
export const {
  onLoadingBusiness,
  setBusinessData,
  loadBusinessFromStorage,
  clearBusinessData,
  onErrorBusiness
} = businessSlice.actions;
