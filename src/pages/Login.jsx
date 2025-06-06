import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuthStore, useBusinessStore } from "../hooks";
import { useEffect, useState } from "react";
import { showError } from "../helpers/swal";
import { Navigate } from "react-router-dom";

export default function Login() {

  const { startLogin, startRegister, errorMessage, status, user, checkAuthToken } = useAuthStore();
  const { startLoadingBusiness } = useBusinessStore();
  const [isRegistering, setIsRegistering] = useState(false);

  // Formik para login
  const loginFormik = useFormik({
    initialValues: {
      loginEmail: "",
      loginPassword: "",
    },
    validationSchema: Yup.object({
      loginEmail: Yup.string().required("Requerido"),
      loginPassword: Yup.string().required("Requerido"),
    }),
    onSubmit: ({ loginEmail: email, loginPassword: password }) => {
      startLogin({ email, password });
    },
  });

  // Formik para registro
  const registerFormik = useFormik({
    initialValues: {
      registerName: "",
      registerEmail: "",
      registerPassword: "",
    },
    validationSchema: Yup.object({
      registerName: Yup.string().required("Nombre requerido"),
      registerEmail: Yup.string().email("Correo inválido").required("Correo requerido"),
      registerPassword: Yup.string().min(6, "Mínimo 6 caracteres").required("Contraseña requerida"),
    }),
    onSubmit: ({ registerEmail: email, registerName: name, registerPassword: password }) => {
      startRegister({ email, password, name })
    },
  });

  useEffect(() => {
    if (errorMessage) {
      showError(errorMessage);
    }
  }, [errorMessage]);

  useEffect(() => {
    if(status==="authenticated"&&user?.uid){
      startLoadingBusiness({_id:user.uid});
    }
  }, [status, user])
  

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'checking') {
    return <p className="text-center text-gray-600">Verificando sesión...</p>;
  }

  if (status === 'authenticated') {
    // Redirige al dashboard según el rol
    const target = user.role === 'ADMIN' ? '/admin' : '/user';
    return <Navigate to={target} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {isRegistering ? "Registro" : "Iniciar sesión"}
        </h2>

        {!isRegistering ? (
          <form onSubmit={loginFormik.handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <input
                type="email"
                id="loginEmail"
                name="loginEmail"
                {...loginFormik.getFieldProps("loginEmail")}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                id="loginPassword"
                name="loginPassword"
                {...loginFormik.getFieldProps("loginPassword")}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Iniciar sesión
            </button>
          </form>
        ) : (
          <form onSubmit={registerFormik.handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="registerName" className="block text-sm font-medium text-gray-700">
                Nombre completo
              </label>
              <input
                type="text"
                id="registerName"
                name="registerName"
                {...registerFormik.getFieldProps("registerName")}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="registerEmail" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <input
                type="email"
                id="registerEmail"
                name="registerEmail"
                {...registerFormik.getFieldProps("registerEmail")}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="registerPassword" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                id="registerPassword"
                name="registerPassword"
                {...registerFormik.getFieldProps("registerPassword")}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Registrarse
            </button>
          </form>
        )}

        <p className="text-sm text-center text-gray-500">
          {isRegistering ? "¿Ya tienes una cuenta?" : "¿No tienes cuenta?"}{" "}
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-600 hover:underline font-medium"
          >
            {isRegistering ? "Inicia sesión" : "Regístrate"}
          </button>
        </p>
      </div>
    </div>
  );
}
