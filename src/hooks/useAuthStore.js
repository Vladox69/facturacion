import { useDispatch, useSelector } from "react-redux";
import invoiceApi from "../api/invoiceApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async({email,password})=>{
    dispatch(onChecking());
    try {
        const {data} = await invoiceApi.post('/auth',{email,password});
        localStorage.setItem('token',data.token);
        localStorage.setItem('token-init-date',new Date().getTime());
        dispatch(onLogin({name:data.name,uid:data.uid}));
    } catch (error) {
        console.log(error);
        dispatch(onLogout('Credenciales incorrectas'));
        setTimeout(()=>{
            dispatch(clearErrorMessage())
        },10);
    }
  }

  return {
    //* Propiedades
    status,
    user,
    errorMessage,
    //*Métodos
    startLogin
  };
};
