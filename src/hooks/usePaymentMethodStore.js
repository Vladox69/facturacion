import { useDispatch, useSelector } from "react-redux";
import {
  onErrorPaymentMethods,
  onLoadingPaymentMethods,
  onLoadPaymentMethods,
} from "../store";
import invoiceApi from "../api/invoiceApi";

export const usePaymentMethodStore = () => {
  const { isLoadingPaymentMethod, paymentMethods, errorMessagePaymentMethod } =
    useSelector((state) => state.paymentMethod);

  const dispatch = useDispatch();

  const startLoadingPaymentMethods = async () => {
    dispatch(onLoadingPaymentMethods());
    try {
      const { data } = await invoiceApi.get(`/payment-method`);
      dispatch(onLoadPaymentMethods(data.paymentMethod));
    } catch (error) {
      console.log(error);
      dispatch(onErrorPaymentMethods);
    }
  };
  return {
    //* Propiedades
    isLoadingPaymentMethod,
    paymentMethods,
    errorMessagePaymentMethod,
    //* Mètodos
    startLoadingPaymentMethods,
  };
};
