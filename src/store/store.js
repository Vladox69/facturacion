import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { productSlice } from "./slices/productSlice";
import { businessSlice } from "./slices/businessSlice";
import { invoiceSlice } from "./slices/invoiceSlice";
import { customerTypeSlice } from "./slices/customerTypeSlice";
import { customerSlice } from "./slices/customerSlice";
import { paymentMethodSlice } from "./slices/paymentMethodSlice";
import { locationSlice } from "./slices/locationSlice";
import { SRISlice } from "./slices/SRISlice";
import { PDFSlice } from "./slices/PDFSlice";
import { saleSlice } from "./slices/saleSlice";
import { mailSlice } from "./slices/mailSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    product: productSlice.reducer,
    business: businessSlice.reducer,
    invoice: invoiceSlice.reducer,
    customerType: customerTypeSlice.reducer,
    customer: customerSlice.reducer,
    paymentMethod: paymentMethodSlice.reducer,
    location: locationSlice.reducer,
    SRI:SRISlice.reducer,
    PDF: PDFSlice.reducer,
    sale: saleSlice.reducer,
    mail: mailSlice.reducer,
  },
});
