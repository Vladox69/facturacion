import { Trash2, Search } from "lucide-react";
import { Formik, Form, Field, FieldArray } from "formik";
import ProductSearchSelect from "../../components/products/ProductSearchSelect";
import * as Yup from "yup";
import { useEffect } from "react";
import { useCustomer, useCustomerType } from "../../hooks";

const invoiceSchema = Yup.object().shape({
  customerType: Yup.string(),
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
    customerType: "",
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

  const { customerTypes, startLoadingCustomerTypes } = useCustomerType();
  const { customer, searchingCustomer } = useCustomer();

  const onClickSearch = (values, setFieldValue) => {
    searchingCustomer({ query: values.customer.identification })
    console.log(customer);
    
    setFieldValue("customer", {
      fullName: customer.fullName,
      identification: customer.identification,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
    });
  }

  const onChangeCustomerType = (customerType, setFieldValue) => {
    console.log(customerType);
    setFieldValue("customer", {
      fullName: "",
      identification: "",
      email: "",
      phone: "",
      address: "",
    });
    setFieldValue("customerType", customerType);
  }

  const onSaveInvoice = (values) => {
    console.log(values);
  }

  useEffect(() => {
    startLoadingCustomerTypes();
  }, []);

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
                  <div className="flex items-center gap-2 mt-2">
                    <label className="text-sm min-w-[100px]">CI/RUC:</label>
                    <Field name="customer.identification">
                      {({ field, form }) => {
                        const type = form.values.customerType;

                        // Determinar maxLength dinámicamente
                        let maxLength = 13;
                        if (type === "CEDULA") maxLength = 10;
                        else if (type === "PASAPORTE") maxLength = 9;
                        else if (
                          type === "RUC" ||
                          type === "VENTA A CONSUMIDOR FINAL" ||
                          type === "IDENTIFICACION DEL EXTERIOR"
                        ) {
                          maxLength = 13;
                        }
                        return (
                          <div className="relative flex-1 min-w-[325px]">
                            <input
                              {...field}
                              className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
                              maxLength={maxLength}
                              placeholder={`Máximo ${maxLength} caracteres`}
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-blue-600"
                              onClick={() => onClickSearch(values, setFieldValue)}
                            >
                              <Search size={18} />
                            </button>
                          </div>
                        );
                      }}
                    </Field>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-sm min-w-[50px]">Tipo:</label>
                    <Field
                      as="select"
                      name="customerType"
                      className="border border-gray-300 rounded px-3 py-2"
                      onChange={(e) => { onChangeCustomerType(e.target.value, setFieldValue) }}
                    >
                      <option value="">Seleccione</option>
                      {customerTypes.map((customerType) => (
                        <option
                          value={customerType.description}
                        >
                          {customerType.description}
                        </option>
                      ))}
                    </Field>
                  </div>
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
              <div className="col-span-12 md:col-span-9 space-y-4 relative">
                {/* Product selector con z-index superior */}
                <div className="relative z-20">
                  <ProductSearchSelect
                    onSelect={(product) => {
                      const existing = values.saleDetails.find(
                        (p) => p.product === product.name
                      );
                      if (!existing) {
                        setFieldValue("saleDetails", [
                          ...values.saleDetails,
                          {
                            product: product.name,
                            quantity: 1,
                            unitValue: product.pvp,
                          },
                        ]);
                      }
                    }}
                  />
                </div>

                {/* Tabla de productos con z-10 */}
                <div className="relative z-10 overflow-x-auto border border-gray-300 rounded-md h-[250px] overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="text-gray-600 border-b border-gray-300 bg-gray-50 sticky top-0 z-10">
                      <tr>
                        <th className="py-2 px-3 text-left">N.</th>
                        <th className="px-3 text-left">Producto</th>
                        <th className="px-3 text-right">Cantidad</th>
                        <th className="px-3 text-right">Precio</th>
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
                            <td className="px-3 text-right">
                              <input
                                type="number"
                                min={1}
                                value={item.quantity}
                                onChange={(e) =>
                                  setFieldValue(
                                    `saleDetails[${index}].quantity`,
                                    Number(e.target.value)
                                  )
                                }
                                className="w-16 text-right border border-gray-300 rounded px-1"
                              />
                            </td>
                            <td className="px-3 text-right">
                              ${item.unitValue.toFixed(2)}
                            </td>
                            <td className="px-3 text-right">
                              <input
                                type="number"
                                min={0}
                                max={100}
                                value={item.discount || 0}
                                onChange={(e) =>
                                  setFieldValue(
                                    `saleDetails[${index}].discount`,
                                    Number(e.target.value)
                                  )
                                }
                                className="w-14 text-right border border-gray-300 rounded px-1"
                              />
                            </td>
                            <td className="px-3 text-right">
                              $
                              {(
                                item.quantity *
                                item.unitValue *
                                (1 - (item.discount || 0) / 100)
                              ).toFixed(2)}
                            </td>
                            <td className="px-3 text-center">
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...values.saleDetails];
                                  updated.splice(index, 1);
                                  setFieldValue("saleDetails", updated);
                                }}
                                className="text-red-600 hover:text-red-800"
                                title="Eliminar producto"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
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
                onClick={() => onSaveInvoice(values)}
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
