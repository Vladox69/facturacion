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
        otherwise: (schema) => schema
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
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Nombre</label>
        <input type="text" className="mt-1 w-full border rounded px-3 py-2"
          placeholder="Ej: Juan Pérez" {...formik.getFieldProps("name")} />
        {formik.touched.name && formik.errors.name && <p className="text-red-500 text-sm">{formik.errors.name}</p>}
      </div>

      <div>
        <label className="block font-medium">Email</label>
        <input type="email" className="mt-1 w-full border rounded px-3 py-2"
          placeholder="Ej: correo@example.com" {...formik.getFieldProps("email")} />
        {formik.touched.email && formik.errors.email && <p className="text-red-500 text-sm">{formik.errors.email}</p>}
      </div>

      <div>
        <label className="block font-medium">Contraseña</label>
        <input type="password" className="mt-1 w-full border rounded px-3 py-2"
          placeholder={editingUser ? "Opcional" : "Obligatoria"} {...formik.getFieldProps("password")} />
        {formik.touched.password && formik.errors.password && <p className="text-red-500 text-sm">{formik.errors.password}</p>}
      </div>

      <div>
        <label className="block font-medium">Rol</label>
        <select className="mt-1 w-full border rounded px-3 py-2"
          {...formik.getFieldProps("role")}>
          <option value="USER">Usuario</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel}
          className="border px-4 py-2 rounded hover:bg-gray-100">
          Cancelar
        </button>
        <button type="submit"
          className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800">
          {editingUser ? "Actualizar Usuario" : "Crear Usuario"}
        </button>
      </div>
    </form>
  );
}
