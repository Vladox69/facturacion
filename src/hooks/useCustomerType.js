import { useDispatch, useSelector } from "react-redux";
import { onErrorCustomerTypes, onLoadCustomerTypes, onLoadingCustomerTypes } from "../store";
import invoiceApi from "../api/invoiceApi";

export const useCustomerType = () => {
  const { isLoadingCustomerTypes, customerTypes, errorMessageCustomerType } =
    useSelector((state) => state.customerType);

  const dispatch = useDispatch();

  const startLoadingCustomerTypes = async()=>{
    dispatch(onLoadingCustomerTypes());
    try {
        const {data} = await invoiceApi.get(`/customer-type`);
        dispatch(onLoadCustomerTypes(data.customerType))
    } catch (error) {
        console.log(error);
        dispatch(onErrorCustomerTypes("Error al cargar los tipos de clientes"))
    }
  }

  return {
    //* Propiedades
    isLoadingCustomerTypes,
    customerTypes,
    errorMessageCustomerType,
    //* Mètodos
    startLoadingCustomerTypes
  };
};
