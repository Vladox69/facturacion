import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { productSlice } from "./product/productSlice";
import { businessSlice } from "./business/businessSlice";

export const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        product:productSlice.reducer,
        business:businessSlice.reducer
    }
})