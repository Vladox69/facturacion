import { useDispatch, useSelector } from "react-redux";
import { onErrorMail, onLoadingMail, onSendMail } from "../store";
import invoiceApi from "../api/invoiceApi";

export const useMailStore = () => {
  const { isSendingMail, errorMessageMail } = useSelector((state) => state.mail);

  const dispatch = useDispatch();

  const startSendingMail = async ({ _id }) => {
    dispatch(onLoadingMail());
    try {
      const { data } = await invoiceApi.post(`/mail/send-mail/${_id}`);
      console.log(data);
      dispatch(onSendMail());
      return data;
    } catch (error) {
      console.error(error);
      dispatch(onErrorMail("Error al enviar el correo"));
    }
  };

  return {
    //* Propiedades
    isSendingMail,
    errorMessageMail,
    //* Metodos
    startSendingMail,
  };
};
