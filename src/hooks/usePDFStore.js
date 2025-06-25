import { useDispatch, useSelector } from "react-redux";
import { loadPDF, onErrorPDF, onLoadingPDF } from "../store";
import invoiceApi from "../api/invoiceApi";

export const usePDFStore = () => {
  const { isLoadingPDF, errorMessagePDF } = useSelector((state) => state.PDF);

  const dispatch = useDispatch();

  const startLoadingPDF = async ({ _id }) => {
    dispatch(onLoadingPDF());
    try {
      const { data } = await invoiceApi.post(`pdf/generate-pdf/${_id}`);
      dispatch(loadPDF());
      return data;
    } catch (error) {
      console.log(error);
      dispatch(onErrorPDF("Error al cargar el PDF"));
    }
  };

  return {
    //* Propiedades
    isLoadingPDF,
    errorMessagePDF,
    //* Metodos
    startLoadingPDF,
  };
};
