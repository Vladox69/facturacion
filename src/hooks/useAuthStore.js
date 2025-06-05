import { useDispatch, useSelector } from "react-redux";
import invoiceApi from "../api/invoiceApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      /*
      const { data } = await invoiceApi.post("/auth", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid,role:data.role }));
      */
      localStorage.setItem("token", "token");
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name:" data.name", uid: "data.uid",role:"USER" }));

    } catch (error) {
      console.log(error);
      dispatch(onLogout("Credenciales incorrectas"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({ email, password, name }) => {
    dispatch(onChecking());
    try {
      const { data } = await invoiceApi.post("/auth/new", {
        email,
        password,
        name,
        role: "USER",
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid,role:data.role }));
    } catch (error) {
      dispatch(onLogout(error.response.data?.message));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token){
      dispatch(onLogout())
      return ;
    }
    try {
      /*
      const {data} = await invoiceApi.get("/auth/renew");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
      */
      localStorage.setItem("token", "token");
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name:" data.name", uid: "data.uid",role:"USER" }));
    } catch (error) {
      console.log(error);
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  return {
    //* Propiedades
    status,
    user,
    errorMessage,
    //*Métodos
    startLogin,
    startRegister,
    checkAuthToken
  };
};
