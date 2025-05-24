import { useFormik } from "formik";
import * as Yup from "yup";

export default function BusinessForm({ onSave, editingBusiness, onCancel }) {
  const formik = useFormik({
    initialValues: {
      businessName: "",
      tradeName: "",
      taxId: "",
      email: "",
      password: "",
      issuesRetention: false,
      accountingRequired: false,
      certificateUrl: "",
      certificateKey: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      businessName: Yup.string().required("Requerido"),
      tradeName: Yup.string().required("Requerido"),
      taxId: Yup.string().required("Requerido"),
      email: Yup.string().email("Email inválido").required("Requerido"),
      password: Yup.string().when("id", {
        is: () => !editingBusiness,
        then: (s) => s.required("Requerido"),
      }),
      certificateUrl: Yup.string().required("Requerido"),
      certificateKey: Yup.string().required("Requerido"),
    }),
    onSubmit: (values, { resetForm }) => {
      onSave({ ...editingBusiness, ...values });
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5">
      {/* Razón Social */}
      <div>
        <label className="block font-medium mb-1">Razón Social</label>
        <input
          type="text"
          name="businessName"
          placeholder="Ej: Soluciones Tech S.A."
          {...formik.getFieldProps("businessName")}
          className="w-full rounded border border-gray-300 focus:border-gray-500 focus:outline-none px-3 py-2"
        />
      </div>

      {/* Nombre Comercial */}
      <div>
        <label className="block font-medium mb-1">Nombre Comercial</label>
        <input
          type="text"
          name="tradeName"
          placeholder="Ej: TechSol"
          {...formik.getFieldProps("tradeName")}
          className="w-full rounded border border-gray-300 focus:border-gray-500 focus:outline-none px-3 py-2"
        />
      </div>

      {/* RUC */}
      <div>
        <label className="block font-medium mb-1">RUC</label>
        <input
          type="text"
          name="taxId"
          placeholder="Ej: 1790012345001"
          {...formik.getFieldProps("taxId")}
          className="w-full rounded border border-gray-300 focus:border-gray-500 focus:outline-none px-3 py-2"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Ej: contacto@empresa.com"
          {...formik.getFieldProps("email")}
          className="w-full rounded border border-gray-300 focus:border-gray-500 focus:outline-none px-3 py-2"
        />
      </div>

      {/* Contraseña */}
      <div>
        <label className="block font-medium mb-1">Contraseña</label>
        <input
          type="password"
          name="password"
          placeholder={editingBusiness ? "Opcional" : "Obligatoria"}
          {...formik.getFieldProps("password")}
          className="w-full rounded border border-gray-300 focus:border-gray-500 focus:outline-none px-3 py-2"
        />
      </div>

      {/* URL Certificado */}
      <div>
        <label className="block font-medium mb-1">URL del Certificado</label>
        <input
          type="text"
          name="certificateUrl"
          placeholder="Ej: https://servidor/certificado.p12"
          {...formik.getFieldProps("certificateUrl")}
          className="w-full rounded border border-gray-300 focus:border-gray-500 focus:outline-none px-3 py-2"
        />
      </div>

      {/* Clave Certificado */}
      <div>
        <label className="block font-medium mb-1">Clave del Certificado</label>
        <input
          type="text"
          name="certificateKey"
          placeholder="Ej: clave123"
          {...formik.getFieldProps("certificateKey")}
          className="w-full rounded border border-gray-300 focus:border-gray-500 focus:outline-none px-3 py-2"
        />
      </div>

      {/* Opciones Booleanas */}
      <div className="flex flex-col md:flex-row gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="issuesRetention"
            checked={formik.values.issuesRetention}
            onChange={formik.handleChange}
          />
          ¿Emite Retención?
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="accountingRequired"
            checked={formik.values.accountingRequired}
            onChange={formik.handleChange}
          />
          ¿Contabilidad Obligatoria?
        </label>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="border px-4 py-2 rounded hover:bg-gray-100">
          Cancelar
        </button>
        <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800">
          {editingBusiness ? "Actualizar Empresa" : "Crear Empresa"}
        </button>
      </div>
    </form>
  );
}
