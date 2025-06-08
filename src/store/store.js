import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { productSlice } from "./slices/productSlice";
import { businessSlice } from "./slices/businessSlice";
import { invoiceSlice } from "./slices/invoiceSlice";

export const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        product:productSlice.reducer,
        business:businessSlice.reducer,
        invoice:invoiceSlice.reducer
    }
})