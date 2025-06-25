import { useDispatch, useSelector } from "react-redux";
import {
  onSaveInvoiceError,
  onSaveInvoiceSuccess,
  onSavingInvoice,
  setInvoiceHTML,
} from "../store";
import invoiceApi from "../api/invoiceApi";

export const useInvoiceStore = () => {
  const {
    isSavingInvoice,
    invoiceData,
    errorMessageInvoice,
    successMessageInvoice,
    invoiceHTML,
  } = useSelector((state) => state.invoice);
  const dispatch = useDispatch();

  const createInvoice = async ({ invoiceData }) => {
    dispatch(onSavingInvoice());
    try {
      const { data } = await invoiceApi.post(`/sale/generate-invoice`, {
        ...invoiceData,
      });
      dispatch(onSaveInvoiceSuccess(data.invoice));
      return data;
    } catch (error) {
      console.log(error);
      dispatch(onSaveInvoiceError("Error al crear la factura"));
      return null;
    }
  };

  const updateMetadataInvoice = async ({ _id }) => {
    dispatch(onSavingInvoice());
    try {
      const { data } = await invoiceApi.put(
        `/sale/update-invoice-metadata/${_id}`
      );
      dispatch(onSaveInvoiceSuccess(data.sale));
      return data;
    } catch (error) {
      console.log(error);
      dispatch(onSaveInvoiceError("Error al actualizar la factura"));
      return null;
    }
  };

  const generateXML = async ({ _id }) => {
    dispatch(onSavingInvoice());
    try {
      const { data } = await invoiceApi.post(
        `/sale/generate-xml-invoice/${_id}`
      );
      dispatch(onSaveInvoiceSuccess(data.sale));
      return data;
    } catch (error) {
      console.log(error);
      dispatch(onSaveInvoiceError("Error al generar el XML de la factura"));
      return null;
    }
  };

  const startSettingInvoiceHTML = (data) => {
    dispatch(setInvoiceHTML(data));
  };

  return {
    //* Propiedad
    isSavingInvoice,
    invoiceData,
    errorMessageInvoice,
    successMessageInvoice,
    invoiceHTML,
    //* Mètodos
    createInvoice,
    updateMetadataInvoice,
    generateXML,
    startSettingInvoiceHTML
  };
};
