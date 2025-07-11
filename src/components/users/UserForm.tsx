import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function UserForm({ onSave, editingUser, onCancel }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "USER",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),
      email: Yup.string().email("Email inválido").required("El email es obligatorio"),
      password: Yup.string().when("id", {
        is: () => !editingUser,
        then: (schema) => schema.required("Contraseña obligatoria"),
        otherwise: (schema) => schema,
      }),
      role: Yup.string().oneOf(["USER", "ADMIN"]),
    }),
    onSubmit: (values, { resetForm }) => {
      const user = { ...editingUser, ...values };
      if (!values.password) delete user.password;
      onSave(user);
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5">
      {/* Nombre */}
      <div>
        <label className="block font-medium mb-1">Nombre</label>
        <input
          type="text"
          placeholder="Ej: Juan Pérez"
          {...formik.getFieldProps("name")}
          className="w-full rounded border border-gray-300 focus:border-gray-500 focus:outline-none px-3 py-2"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block font-medium mb-1">Email</label>
        <input
          type="email"
          placeholder="Ej: correo@example.com"
          {...formik.getFieldProps("email")}
          className="w-full rounded border border-gray-300 focus:border-gray-500 focus:outline-none px-3 py-2"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
        )}
      </div>

      {/* Contraseña */}
      <div>
        <label className="block font-medium mb-1">Contraseña</label>
        <input
          type="password"
          placeholder={editingUser ? "Opcional" : "Obligatoria"}
          {...formik.getFieldProps("password")}
          className="w-full rounded border border-gray-300 focus:border-gray-500 focus:outline-none px-3 py-2"
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
        )}
      </div>

      {/* Rol */}
      <div>
        <label className="block font-medium mb-1">Rol</label>
        <select
          {...formik.getFieldProps("role")}
          className="w-full rounded border border-gray-300 focus:border-gray-500 focus:outline-none px-3 py-2"
        >
          <option value="USER">Usuario</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="border px-4 py-2 rounded hover:bg-gray-100"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          {editingUser ? "Actualizar Usuario" : "Crear Usuario"}
        </button>
      </div>
    </form>
  );
}
