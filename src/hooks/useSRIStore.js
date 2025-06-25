import { useDispatch, useSelector } from "react-redux";
import { clearMessagesSRI, onErrorSRI, onLoadingSRI } from "../store";
import invoiceApi from "../api/invoiceApi";

export const useSRIStore = () => {
  const {
    messageReception,
    messageAuthorization,
    isLoadingSRI,
    errorMessageSRI,
  } = useSelector((state) => state.SRI);
  const dispatch = useDispatch();

  const startReception = async ({ _id }) => {
    dispatch(onLoadingSRI());
    try {
      const { data } = await invoiceApi.post(`/sri/reception/${_id}`);
      dispatch(clearMessagesSRI());
      return data;
    } catch (error) {
      console.log(error);
      dispatch(onErrorSRI("Error al recibir el mensaje del SRI"));
    }
  };

  const startAuthorization = async ({ _id }) => {
    dispatch(onLoadingSRI());
    try {
      const { data } = await invoiceApi.post(`/sri/authorize/${_id}`);
      dispatch(clearMessagesSRI());
      return data;
    } catch (error) {
      console.log(error);
      dispatch(onErrorSRI("Error al autorizar el mensaje del SRI"));
    }
  };

  return {
    //* Propiedades
    messageReception,
    messageAuthorization,
    isLoadingSRI,
    errorMessageSRI,
    //* Metodos
    startReception,
    startAuthorization,
  };
};
