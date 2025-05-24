import { useFormik } from "formik";
import * as Yup from "yup";

export default function LocationForm({ onSave, editingLocation, onCancel }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      code: "",
      emissionPoint: "",
      address: ""
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Requerido"),
      phone: Yup.string().required("Requerido"),
      code: Yup.string().required("Requerido"),
      emissionPoint: Yup.string().required("Requerido"),
      address: Yup.string().required("Requerido"),
    }),
    onSubmit: (values, { resetForm }) => {
      onSave({ ...editingLocation, ...values });
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
          placeholder="Ej: Sucursal Centro"
          {...formik.getFieldProps("name")}
          className="w-full rounded border border-gray-300 focus:border-gray-500 focus:outline-none px-3 py-2"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Teléfono</label>
        <input
          type="text"
          name="phone"
          placeholder="Ej: 022345678"
          {...formik.getFieldProps("phone")}
          className="w-full rounded border border-gray-300 focus:border-gray-500 focus:outline-none px-3 py-2"
        />
        {formik.touched.phone && formik.errors.phone && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Código de Sucursal</label>
        <input
          type="text"
          name="code"
          placeholder="Ej: 001"
          {...formik.getFieldProps("code")}
          className="w-full rounded border border-gray-300 focus:border-gray-500 focus:outline-none px-3 py-2"
        />
        {formik.touched.code && formik.errors.code && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.code}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Punto de Emisión</label>
        <input
          type="text"
          name="emissionPoint"
          placeholder="Ej: 002"
          {...formik.getFieldProps("emissionPoint")}
          className="w-full rounded border border-gray-300 focus:border-gray-500 focus:outline-none px-3 py-2"
        />
        {formik.touched.emissionPoint && formik.errors.emissionPoint && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.emissionPoint}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Dirección</label>
        <input
          type="text"
          name="address"
          placeholder="Ej: Av. Amazonas y Naciones Unidas"
          {...formik.getFieldProps("address")}
          className="w-full rounded border border-gray-300 focus:border-gray-500 focus:outline-none px-3 py-2"
        />
        {formik.touched.address && formik.errors.address && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.address}</p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="border px-4 py-2 rounded hover:bg-gray-100">
          Cancelar
        </button>
        <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800">
          {editingLocation ? "Actualizar Sucursal" : "Crear Sucursal"}
        </button>
      </div>
    </form>
  );
}
