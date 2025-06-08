import { useDispatch, useSelector } from "react-redux";
import invoiceApi from "../api/invoiceApi";
import { loadBusinessFromStorage, onErrorBusiness, onLoadingBusiness, setBusinessData } from "../store";

export const useBusinessStore = () => {
  const { isLoadedBusiness, business, errorMessageBusiness } = useSelector(
    (state) => state.business
  );

  const dispatch = useDispatch();

  const startLoadingBusiness = async ({ _id }) => {
    dispatch(onLoadingBusiness());
    try {
      const { data } = await invoiceApi.get(`/business/user/${_id}`);
      console.log(data);
      dispatch(setBusinessData(data.business));
    } catch (error) {
      console.log(error);
      dispatch(onErrorBusiness("No se pudo cargar los datos del negocio"));
    }
  };

  const startLoadingBusinessFromLocalStorage = () => {
    dispatch(onLoadingBusiness());
    dispatch(loadBusinessFromStorage());
    if(!business){
      dispatch(onErrorBusiness('No se pudo cargar los datos del negocio'));
    }
  };

  return {
    //* Propiedades
    isLoadedBusiness,
    business,
    errorMessageBusiness,
    //* Métodos
    startLoadingBusiness,
    startLoadingBusinessFromLocalStorage
  };
};
