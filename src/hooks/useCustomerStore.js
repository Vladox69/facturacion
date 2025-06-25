import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorMessageCustomer,
  onErrorCustomer,
  onLoadCustomer,
  onLoadCustomers,
  onLoadingCustomer,
} from "../store";
import invoiceApi from "../api/invoiceApi";

export const useCustomerStore = () => {
  const { isLoadingCustomer, customers, customer, errorMessageCustomer } =
    useSelector((state) => state.customer);

  const dispatch = useDispatch();

  const searchingCustomer = async ({ query }) => {
    dispatch(onLoadingCustomer());

    if (query == "" || query == undefined) return;
    const localMatch = customers.find((c) => c.identification === query);
    if (localMatch) {
      dispatch(onLoadCustomer(localMatch));
      return localMatch;
    }
    try {
      const params = new URLSearchParams({ q: query });
      const { data } = await invoiceApi.get(`/customer/search?${params}`);
      if (!data.customer) {
        dispatch(onErrorCustomer("No se encontró al cliente"));
        setTimeout(() => {
          dispatch(clearErrorMessageCustomer());
        }, 10);
        return null;
      }
      dispatch(onLoadCustomer(data.customer));
      dispatch(onLoadCustomers([data.customer]));
      return data.customer;
    } catch (error) {
      console.log(error);
      dispatch(onErrorCustomer("Error al encontrar el cliente"));
      return null;
    }
  };

  return {
    //* Propiedades
    isLoadingCustomer,
    customers,
    customer,
    errorMessageCustomer,
    //* Mètodos
    searchingCustomer,
  };
};
