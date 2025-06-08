import { useDispatch, useSelector } from "react-redux";
import { onSavingInvoice } from "../store";

export const useInvoiceStore = () => {
  const { isSaving, invoiceData, errorMessageInvoice, successMessage } =
    useSelector((state) => state.invoice);
  const dispatch = useDispatch();
  
  const createInvoice = async({invoiceData})=>{
    dispatch(onSavingInvoice());
    try {
        console.log(invoiceData);
        
    } catch (error) {
        console.log(error);
    }
  }

  return {
    //* Propiedad
    isSaving,
    invoiceData,
    errorMessageInvoice,
    successMessage,
    //* Mètodos 
    createInvoice
  };
};
