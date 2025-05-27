import { useFormik } from "formik";
import * as Yup from "yup";

export default function ProductForm({ onSave, editingProduct, onCancel }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      pvp: 0,
      iva: "",
      ice: "",
      business: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Nombre requerido"),
      pvp: Yup.number().min(0.01).required("Precio requerido"),
      iva: Yup.string().required("IVA requerido"),
      ice: Yup.string().required("ICE requerido"),
      business: Yup.string().required("Negocio requerido"),
    }),
    onSubmit: (values, { resetForm }) => {
      onSave({ ...editingProduct, ...values });
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5">
      <div>
        <label className="block font-medium mb-1">Nombre del producto</label>
        <input
          type="text"
          name="name"
          placeholder="Ej: Coca Cola 500ml"
          {...formik.getFieldProps("name")}
          className="w-full rounded border border-gray-300 focus:border-gray-500 focus:outline-none px-3 py-2"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Precio PVP</label>
        <input
          type="number"
          name="pvp"
          step="0.01"
          placeholder="Ej: 1.50"
          {...formik.getFieldProps("pvp")}
          className="w-full rounded border border-gray-300 focus:border-gray-500 focus:outline-none px-3 py-2"
        />
        {formik.touched.pvp && formik.errors.pvp && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.pvp}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">IVA</label>
        <input
          type="text"
          name="iva"
          placeholder="Ej: 12%"
          {...formik.getFieldProps("iva")}
          className="w-full rounded border border-gray-300 focus:border-gray-500 focus:outline-none px-3 py-2"
        />
        {formik.touched.iva && formik.errors.iva && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.iva}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">ICE</label>
        <input
          type="text"
          name="ice"
          placeholder="Ej: 0%"
          {...formik.getFieldProps("ice")}
          className="w-full rounded border border-gray-300 focus:border-gray-500 focus:outline-none px-3 py-2"
        />
        {formik.touched.ice && formik.errors.ice && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.ice}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Negocio</label>
        <input
          type="text"
          name="business"
          placeholder="Ej: Negocio A"
          {...formik.getFieldProps("business")}
          className="w-full rounded border border-gray-300 focus:border-gray-500 focus:outline-none px-3 py-2"
        />
        {formik.touched.business && formik.errors.business && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.business}</p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="border px-4 py-2 rounded hover:bg-gray-100">
          Cancelar
        </button>
        <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800">
          {editingProduct ? "Actualizar" : "Crear"}
        </button>
      </div>
    </form>
  );
}
