import { createSlice } from "@reduxjs/toolkit";
export const locationSlice = createSlice({
  name: "location",
  initialState: {
    isLoadingLocation: false,
    locations: [],
    location: {},
    errorMessageLocation: undefined,
  },
  reducers: {
    onLoadingLocation: (state) => {
      state.isLoadingLocation = true;
      state.location = {};
    },
    onLoadLocations: (state, { payload = [] }) => {
      state.isLoadingLocation = false;
      payload.forEach((location) => {
        const exists = state.locations.some(
          (dbLocation) => dbLocation._id === location._id
        );
        if (!exists) {
          state.locations.push(location);
        }
      });
    },
    onErrorLocation: (state, { payload }) => {
      state.isLoadingLocation = false;
      state.errorMessageLocation = payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const { onLoadingLocation, onLoadLocations, onErrorLocation } =
  locationSlice.actions;
