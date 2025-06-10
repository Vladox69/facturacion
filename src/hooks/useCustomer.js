import { useDispatch, useSelector } from "react-redux";
import {
  onErrorCustomer,
  onLoadCustomer,
  onLoadCustomers,
  onLoadingCustomer,
} from "../store";
import invoiceApi from "../api/invoiceApi";

export const useCustomer = () => {
  const { isLoadingCustomer, customers, customer, errorMessageCustomer } =
    useSelector((state) => state.customer);

  const dispatch = useDispatch();

  const searchingCustomer = async ({ query }) => {
    dispatch(onLoadingCustomer());

    if (query == "" || query == undefined) return;
    const localMatch = customers.find(
      (c) => c.identification === query
    );
    if (localMatch) {
      dispatch(onLoadCustomer(localMatch));
      return;
    }
    try {
      const params = new URLSearchParams({ q: query });
      const { data } = await invoiceApi.get(`/customer/search?${params}`);
      dispatch(onLoadCustomer(data.customer));
      dispatch(onLoadCustomers([data.customer]));
    } catch (error) {
      console.log(error);
      dispatch(onErrorCustomer("Error al encontrar el cliente"));
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
