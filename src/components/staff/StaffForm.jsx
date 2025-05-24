import { useFormik } from "formik";
import * as Yup from "yup";

export default function StaffForm({ onSave, editingStaff, onCancel }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      identification: "",
      email: "",
      password: "",
      role: "staff",
      active: true,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Requerido"),
      identification: Yup.string().required("Requerido"),
      email: Yup.string().email("Email inválido").required("Requerido"),
      password: Yup.string().when("id", {
        is: () => !editingStaff,
        then: (s) => s.required("Contraseña requerida"),
      }),
      role: Yup.string().oneOf(["staff", "admin"]),
    }),
    onSubmit: (values, { resetForm }) => {
      onSave({ ...editingStaff, ...values });
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5">
      <div>
        <label className="block font-medium mb-1">Nombre</label>
        <input
          type="text"
          name="name"
          placeholder="Ej: Carlos Pérez"
          {...formik.getFieldProps("name")}
          className="w-full rounded border border-gray-300 focus:border-gray-500 focus:outline-none px-3 py-2"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Identificación</label>
        <input
          type="text"
          name="identification"
          placeholder="Ej: 1234567890"
          {...formik.getFieldProps("identification")}
          className="w-full rounded border border-gray-300 focus:border-gray-500 focus:outline-none px-3 py-2"
        />
        {formik.touched.identification && formik.errors.identification && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.identification}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Correo</label>
        <input
          type="email"
          name="email"
          placeholder="correo@empresa.com"
          {...formik.getFieldProps("email")}
          className="w-full rounded border border-gray-300 focus:border-gray-500 focus:outline-none px-3 py-2"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Contraseña</label>
        <input
          type="password"
          name="password"
          placeholder={editingStaff ? "Opcional" : "Obligatoria"}
          {...formik.getFieldProps("password")}
          className="w-full rounded border border-gray-300 focus:border-gray-500 focus:outline-none px-3 py-2"
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Rol</label>
        <select
          name="role"
          {...formik.getFieldProps("role")}
          className="w-full rounded border border-gray-300 focus:border-gray-500 focus:outline-none px-3 py-2"
        >
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="active"
          checked={formik.values.active}
          onChange={formik.handleChange}
        />
        <label>¿Activo?</label>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="border px-4 py-2 rounded hover:bg-gray-100">
          Cancelar
        </button>
        <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800">
          {editingStaff ? "Actualizar" : "Crear"}
        </button>
      </div>
    </form>
  );
}
