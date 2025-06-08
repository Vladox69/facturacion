import { Trash2 } from "lucide-react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import ProductSearchSelect from "../../components/products/ProductSearchSelect";
import * as Yup from "yup";

const invoiceSchema = Yup.object().shape({
  customer: Yup.object().shape({
    fullName: Yup.string().required("Nombre es requerido"),
    identification: Yup.string().required("Cédula/RUC es requerido"),
    email: Yup.string().email("Correo inválido").required("Correo requerido"),
    phone: Yup.string().required("Teléfono requerido"),
    address: Yup.string().required("Dirección requerida"),
  }),
  issueDate: Yup.string().required("Fecha de emisión requerida"),
  guideNumber: Yup.string(),
  paymentDetails: Yup.array()
    .of(
      Yup.object().shape({
        paymentMethod: Yup.string().required("Forma de pago requerida"),
        value: Yup.number().required("Monto requerido"),
      })
    )
    .min(1, "Debe agregar al menos un método de pago"),
  saleDetails: Yup.array()
    .of(
      Yup.object().shape({
        product: Yup.string().required(),
        quantity: Yup.number().min(1).required(),
        unitValue: Yup.number().required(),
      })
    )
    .min(1, "Debe agregar al menos un producto"),
});

export default function GenerateInvoice() {
  const initialValues = {
    customer: {
      fullName: "",
      identification: "",
      email: "",
      phone: "",
      address: "",
    },
    issueDate: new Date().toISOString().split("T")[0],
    guideNumber: "",
    paymentDetails: [],
    saleDetails: [],
  };

  return (
    <div className="bg-white text-gray-900 p-6 space-y-6 min-h-screen">
      <div className="text-2xl font-semibold border-b border-gray-300 pb-3">
        Generar Factura
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={invoiceSchema}
        onSubmit={(values) => {
          console.log("Factura generada:", values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-8 space-y-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm min-w-[100px]">CI/RUC:</label>
                  <Field
                    name="customer.identification"
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm min-w-[100px]">Nombres:</label>
                  <Field
                    name="customer.fullName"
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm min-w-[100px]">Correo:</label>
                  <Field
                    name="customer.email"
                    type="email"
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm min-w-[100px]">Teléfono:</label>
                  <Field
                    name="customer.phone"
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm min-w-[100px]">Dirección:</label>
                  <Field
                    name="customer.address"
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              </div>

              <div className="col-span-12 md:col-span-4 space-y-4">
                <div>
                  <label className="text-sm">Fecha emisión</label>
                  <Field
                    name="issueDate"
                    type="date"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="text-sm">Guía de remisión</label>
                  <Field
                    name="guideNumber"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <FieldArray name="paymentDetails">
                  {({ push }) => (
                    <div>
                      <label className="text-sm">Forma de pago</label>
                      <div className="flex gap-2 mt-1">
                        <select
                          onChange={(e) =>
                            setFieldValue(
                              "currentPaymentMethod",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded px-3 py-2"
                        >
                          <option value="">Seleccione</option>
                          <option value="efectivo">Efectivo</option>
                          <option value="tarjeta">Tarjeta</option>
                          <option value="transferencia">Transferencia</option>
                        </select>
                        <input
                          type="number"
                          placeholder="$"
                          onChange={(e) =>
                            setFieldValue("currentPaymentValue", e.target.value)
                          }
                          className="w-32 border border-gray-300 rounded px-3 py-2"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (
                              values.currentPaymentMethod &&
                              values.currentPaymentValue
                            ) {
                              push({
                                paymentMethod: values.currentPaymentMethod,
                                value: Number(values.currentPaymentValue),
                              });
                              setFieldValue("currentPaymentMethod", "");
                              setFieldValue("currentPaymentValue", "");
                            }
                          }}
                          className="bg-gray-900 text-white px-3 py-2 rounded hover:bg-gray-800"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </FieldArray>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6 items-start">
              {/* Detalles de pago */}
              <div className="col-span-12 md:col-span-3 self-start">
                <div className="mb-2 mt-6">
                  <br />
                  <br />
                </div>
                <table className="w-full text-sm border border-gray-300 rounded-md">
                  <thead className="text-gray-600 border-b border-gray-300 bg-gray-50 ">
                    <tr>
                      <th className="p-2 text-left" colSpan={2}>
                        Detalle de pago
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800 divide-y divide-gray-200">
                    {values.paymentDetails.length === 0 ? (
                      <tr>
                        <td
                          colSpan={2}
                          className="px-3 py-2 italic text-gray-500"
                        >
                          Sin pagos registrados
                        </td>
                      </tr>
                    ) : (
                      values.paymentDetails.map((pay, idx) => (
                        <tr key={idx}>
                          <td className="px-3 py-2 capitalize font-medium">
                            {pay.paymentMethod}
                          </td>
                          <td className="px-3 py-2 text-right">
                            ${pay.value.toFixed(2)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Productos */}
              <div className="col-span-12 md:col-span-9 space-y-4">
                <ProductSearchSelect
                  onSelect={(product) => {
                    const existing = values.saleDetails.find(
                      (p) => p.product === product._id
                    );
                    if (!existing) {
                      setFieldValue("saleDetails", [
                        ...values.saleDetails,
                        {
                          product: product._id,
                          quantity: 1,
                          unitValue: product.pvp,
                        },
                      ]);
                    }
                  }}
                />

                <div className="overflow-x-auto border border-gray-300 rounded-md h-[250px] overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="text-gray-600 border-b border-gray-300 bg-gray-50 sticky top-0 z-10">
                      <tr>
                        <th className="py-2 px-3 text-left">N.</th>
                        <th className="px-3 text-left">Producto</th>
                        <th className="px-3 text-right">Cantidad</th>
                        <th className="px-3 text-right">Precio</th>
                        <th className="px-3 text-right">P. Esp.</th>
                        <th className="px-3 text-right">Desc. %</th>
                        <th className="px-3 text-right">Subtotal</th>
                        <th className="px-3"></th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-800 divide-y divide-gray-100">
                      {values.saleDetails.length === 0 ? (
                        <tr>
                          <td
                            colSpan={8}
                            className="px-3 py-2 italic text-gray-500 text-center"
                          >
                            Sin productos agregados
                          </td>
                        </tr>
                      ) : (
                        values.saleDetails.map((item, index) => (
                          <tr key={index}>
                            <td className="py-1 px-3">{index + 1}</td>
                            <td className="px-3">{item.product}</td>
                            <td className="px-3 text-right">{item.quantity}</td>
                            <td className="px-3 text-right">
                              ${item.unitValue.toFixed(2)}
                            </td>
                            <td className="px-3 text-right">-</td>
                            <td className="px-3 text-right">-</td>
                            <td className="px-3 text-right">
                              ${(item.quantity * item.unitValue).toFixed(2)}
                            </td>
                            <td className="px-3"></td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-10 text-sm text-gray-600 border-t border-gray-300 pt-4">
              <div className="space-y-1 text-right">
                <div>
                  Subtotal sin imp.:{" "}
                  <span className="text-gray-900">$0.00</span>
                </div>
                <div>
                  Descuento: <span className="text-gray-900">$0.00</span>
                </div>
                <div>
                  Impuestos: <span className="text-gray-900">$0.00</span>
                </div>
                <div className="text-xl font-bold mt-2">
                  TOTAL: <span className="text-green-600">$0.00</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                type="reset"
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
              >
                <Trash2 size={18} /> Limpiar datos
              </button>
              <button
                type="submit"
                className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Guardar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
