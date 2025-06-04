import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuthStore } from "../hooks";

export default function Login() {
  const formik = useFormik({
    initialValues: {
      loginEmail: "",
      loginPassword: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      loginEmail: Yup.string().required("Requerido"),
      loginPassword: Yup.string().required("Requerido"),
    }),
    onSubmit:(values,{resetForm})=>{
      const {loginEmail:email,loginPassword:password}=values;
      startLogin({email,password});
      //resetForm();
    }
  });

  const { startLogin } = useAuthStore();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Iniciar sesión
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="loginEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="loginEmail"
              name="loginEmail"
              {...formik.getFieldProps("loginEmail")}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="correo@ejemplo.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="loginPassword"
              name="loginPassword"
              {...formik.getFieldProps("loginPassword")}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Iniciar sesión
          </button>
        </form>
        <p className="text-sm text-center text-gray-500">
          ¿No tienes cuenta?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}
