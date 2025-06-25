import { Trash2, Search } from "lucide-react";
import { Formik, Form, Field, FieldArray } from "formik";
import ProductSearchSelect from "../../components/products/ProductSearchSelect";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import {
  useBusinessStore,
  useCustomerStore,
  useCustomerTypeStore,
  useInvoiceStore,
  useLocationStore,
  usePaymentMethodStore,
  usePDFStore,
  useProductStore,
  useSRIStore,
} from "../../hooks";
import { showError, showInfo, showLoading } from "../../helpers/swal";
import { calculateProductDetails } from "../../helpers";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const invoiceSchema = Yup.object().shape({
  location: Yup.string().required("Localidad es requerida"),
  customer: Yup.object().shape({
    id: Yup.string(),
    fullName: Yup.string().required("Nombre es requerido"),
    identification: Yup.string().required("Cédula/RUC es requerido"),
    email: Yup.string().email("Correo inválido").required("Correo requerido"),
    phone: Yup.string().required("Teléfono requerido"),
    address: Yup.string().required("Dirección requerida"),
    identificationType: Yup.object().shape({
      _id: Yup.string(),
      description: Yup.string(),
      code: Yup.string(),
    }),
  }),
  payment: Yup.object().shape({
    method: Yup.string(),
    value: Yup.number(),
  }),
  issueDate: Yup.string().required("Fecha de emisión requerida"),
  guideNumber: Yup.string(),
  paymentDetails: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string(),
        code: Yup.string(),
        paymentMethod: Yup.string().required("Forma de pago requerida"),
        value: Yup.number().required("Monto requerido"),
      })
    )
    .min(1, "Debe agregar al menos un método de pago"),
  saleDetails: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string().required(),
        product: Yup.string().required(),
        quantity: Yup.number().min(1).required(),
        unitValue: Yup.number().required(),
        totalValue: Yup.number(),
        valueWithoutTaxes: Yup.number(),
        totalTaxes: Yup.number(),
        ad1: Yup.string(),
        ad2: Yup.string(),
        ad3: Yup.string(),
        tax: Yup.string().required(),
        unitPriceWithoutTax: Yup.number(),
        unitPriceWithTax: Yup.number(),
        totalPriceWithTax: Yup.number(),
        totalPriceWithoutTax: Yup.number(),
      })
    )
    .min(1, "Debe agregar al menos un producto"),
  subtotal: Yup.number().required(),
  ivaTotal: Yup.number().required(),
  total: Yup.number().required(),
});

export default function GenerateInvoice() {
  const initialValues = {
    location: "",
    customer: {
      _id: "",
      fullName: "",
      identification: "",
      email: "",
      phone: "",
      address: "",
      identificationType: {
        _id: "",
        description: "",
        code: "",
      },
    },
    issueDate: new Date().toISOString().split("T")[0],
    guideNumber: "",
    paymentDetails: [],
    saleDetails: [],
    subtotal: 0,
    ivaTotal: 0,
    total: 0,
    payment: {
      method: "",
      value: 0,
    },
  };

  const navigate = useNavigate();
  const { customerTypes, startLoadingCustomerTypes } = useCustomerTypeStore();
  const { errorMessageCustomer, isLoadingCustomer, searchingCustomer } =
    useCustomerStore();
  const { products } = useProductStore();
  const { paymentMethods, startLoadingPaymentMethods } =
    usePaymentMethodStore();
  const {
    createInvoice,
    updateMetadataInvoice,
    generateXML,
    startSettingInvoiceHTML,
  } = useInvoiceStore();
  const { locations, startLoadingLocations } = useLocationStore();
  const { business } = useBusinessStore();
  const { startReception, startAuthorization } = useSRIStore();
  const { startLoadingPDF } = usePDFStore();
  const [isLoadingProcess, setIsLoadingProcess] = useState(false);

  const onClickSearch = async (values, setFieldValue) => {
    const resp = await searchingCustomer({
      query: values.customer.identification,
    });
    if (resp) {
      setFieldValue("customer", {
        _id: resp._id,
        fullName: resp.fullName,
        identification: resp.identification,
        email: resp.email,
        phone: resp.phone,
        address: resp.address,
        identificationType: resp.identificationType,
      });
    } else {
      const length = values.customer.identification.length;
      const identificationType = customerTypes.find(
        (ct) => ct.length == length
      );
      setFieldValue("customer", {
        fullName: "",
        identification: values.customer.identification,
        email: "",
        phone: "",
        address: "",
        identificationType,
      });
    }
    Swal.close();
  };

  const onAddProdcut = (values, setFieldValue, product, quantity) => {
    const productWithDetails = calculateProductDetails(product, quantity);
    const updatedSaleDetails = [...values.saleDetails, productWithDetails];
    setFieldValue("saleDetails", updatedSaleDetails);
    onUpdateTotal(updatedSaleDetails, setFieldValue);
  };

  const onUpdateProduct = (values, setFieldValue, newQuantity, productId) => {
    const productIndex = values.saleDetails.findIndex(
      (item) => item.id == productId
    );
    const product = products.find((p) => p._id == productId);
    if (productIndex == -1 || !product) return;
    const updatedProduct = calculateProductDetails(product, newQuantity);
    const updatedSaleDetails = [...values.saleDetails];
    updatedSaleDetails[productIndex] = updatedProduct;
    setFieldValue("saleDetails", updatedSaleDetails);
    onUpdateTotal(updatedSaleDetails, setFieldValue);
  };

  const onUpdateTotal = (saleDetails, setFieldValue) => {
    const updatedTotals = saleDetails.reduce(
      (totals, item) => {
        totals.subtotal += item.totalPriceWithoutTax;
        totals.ivaTotal += item.totalTaxes;
        totals.total += item.totalValue;
        return totals;
      },
      { subtotal: 0, ivaTotal: 0, iceTotal: 0, total: 0 }
    );
    setFieldValue("subtotal", updatedTotals.subtotal);
    setFieldValue("ivaTotal", updatedTotals.ivaTotal);
    setFieldValue("total", updatedTotals.total);
  };

  const onDeleteProduct = (values, setFieldValue, index) => {
    const updated = [...values.saleDetails];
    updated.splice(index, 1);
    setFieldValue("saleDetails", updated);
    onUpdateTotal(updated, setFieldValue);
  };

  const onAddPayment = (values, setFieldValue, payment, quantity) => {
    const paymentMethod = paymentMethods.find((pm) => pm._id == payment);
    const newPaymentDetail = {
      id: paymentMethod._id,
      paymentMethod: paymentMethod.name,
      code: paymentMethod.code,
      value: quantity,
    };
    const updatedPaymentMethods = [...values.paymentDetails, newPaymentDetail];
    setFieldValue("paymentDetails", updatedPaymentMethods);

    setFieldValue("payment.method", "");
    setFieldValue("payment.value", 0);
  };

  const onUpdatePayment = (values, setFieldValue, paymentId, newQuantity) => {
    const paymentIndex = values.paymentDetails.findIndex(
      (item) => item.id == paymentId
    );

    if (paymentIndex === -1) return;

    const updatedPayments = [...values.paymentDetails];
    updatedPayments[paymentIndex] = {
      ...updatedPayments[paymentIndex],
      value: newQuantity,
    };

    setFieldValue("paymentDetails", updatedPayments);
  };

  const onDeletePayment = (values, setFieldValue, index) => {
    const updated = [...values.paymentDetails];
    updated.splice(index, 1);
    setFieldValue("paymentDetails", updated);
  };

  const onSaveInvoice = async (values) => {
    try {
      setIsLoadingProcess(true);
      const now = new Date();
      const dateWithCurrentTime = new Date(
        `${values.issueDate}T${now.getHours().toString().padStart(2, "0")}:` +
          `${now.getMinutes().toString().padStart(2, "0")}:` +
          `${now.getSeconds().toString().padStart(2, "0")}.${now
            .getMilliseconds()
            .toString()
            .padStart(3, "0")}Z`
      );
      const sale = {
        location: values.location,
        sequential: "not",
        accessKey: "not-access-key",
        issueDate: dateWithCurrentTime,
        fiscalPeriod: now.getFullYear(),
        totalWithoutTaxes: values.subtotal,
        totalDiscount: 0,
        totalAmount: values.total,
        receptionStatus: "PENDIENTE",
        authorizationStatus: "PENDIENTE",
        errorDescription: "",
        invoiceUrl: "not-url",
        approvalUrl: "not-approval-url",
        ad1: "",
        ad2: "",
      };
      const saleDetails = values.saleDetails.map((item) => ({
        id: item.id,
        product: item.id,
        quantity: item.quantity,
        unitValue: item.unitValue,
        totalValue: item.totalValue,
        valueWithoutTaxes: item.valueWithoutTaxes,
        totalTaxes: item.totalTaxes,
        ad1: item.ad1,
        ad2: item.ad2,
        ad3: item.ad3,
        tax: item.tax,
        unitPriceWithoutTax: item.unitPriceWithoutTax,
        unitPriceWithTax: item.unitPriceWithTax,
        totalPriceWithTax: item.totalPriceWithTax,
        totalPriceWithoutTax: item.totalPriceWithoutTax,
      }));
      const paymentDetails = values.paymentDetails.map((item) => ({
        paymentMethod: item.id,
        value: item.value,
      }));
      const invoiceData = {
        customer: values.customer,
        sale,
        saleDetails,
        paymentDetails,
      };
      const invoice = await createInvoice({ invoiceData });
      if (!invoice.ok) return;
      const _id = invoice.sale._id;
      const updatedInvoice = await updateMetadataInvoice({
        _id,
      });
      if (!updatedInvoice.ok) return;
      const xmlInvoice = await generateXML({ _id });
      if (!xmlInvoice.ok) return;
      const SRIReception = await startReception({ _id });
      if (!SRIReception.ok) return;
      const SRIAuthorization = await startAuthorization({ _id });
      if (!SRIAuthorization.ok) return;
      const PDFUpload = await startLoadingPDF({ _id });
      if (!PDFUpload.ok) return;
      setIsLoadingProcess(false);
      Swal.close();
      const valueHTML={...values}
      valueHTML.location = locations.find((loc) => loc._id == values.location);
      startSettingInvoiceHTML(valueHTML);
      showInfo("Factura generada y procesada correctamente.",true, ()=> navigate("/user/resume-invoice"));
    } catch (error) {
      showError("Error al procesar factura.");
      console.error("Error al guardar la factura:", error);
      setIsLoadingProcess(false);
    }
  };

  useEffect(() => {
    if (errorMessageCustomer) {
      showInfo(errorMessageCustomer);
    }
  }, [errorMessageCustomer]);

  useEffect(() => {
    if (isLoadingProcess) {
      showLoading("Procesando, por favor espere...");
    }
  }, [isLoadingProcess]);

  useEffect(() => {
    if (isLoadingCustomer) {
      showLoading("Cargando cliente, por favor espere...");
    }
  }, [isLoadingCustomer]);

  useEffect(() => {
    startLoadingCustomerTypes();
    startLoadingPaymentMethods();
    startLoadingLocations({ _id: business._id });
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
          onSaveInvoice(values);
        }}
      >
        {({ values, setFieldValue, isValid, errors, touched }) => {
          const totalPayments = values.paymentDetails.reduce(
            (total, payment) => total + payment.value,
            0
          );

          const totalSale = values.saleDetails.reduce(
            (total, item) =>
              total +
              item.quantity * item.unitValue * (1 - (item.discount || 0) / 100),
            0
          );

          const isTotalValid = totalPayments === totalSale;
          return (
            <Form>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm min-w-[100px]">CI/RUC:</label>
                    <Field name="customer.identification">
                      {({ field }) => {
                        return (
                          <div className="relative flex-1 max-w-[500px]">
                            <input
                              {...field}
                              className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
                              minLength={9}
                              maxLength={13}
                              placeholder={`Máximo 13 caracteres`}
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-blue-600"
                              onClick={() =>
                                onClickSearch(values, setFieldValue)
                              }
                            >
                              <Search size={18} />
                            </button>
                          </div>
                        );
                      }}
                    </Field>
                    {errors.customer?.identification &&
                      touched.customer?.identification && (
                        <div className="text-red-600 text-sm">
                          {errors.customer.identification}
                        </div>
                      )}
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-sm min-w-[100px]">Nombres:</label>
                    <Field
                      name="customer.fullName"
                      className="flex-1 border border-gray-300 rounded px-3 py-2"
                    />
                    {errors.customer?.fullName &&
                      touched.customer?.fullName && (
                        <div className="text-red-600 text-sm">
                          {errors.customer.fullName}
                        </div>
                      )}
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-sm min-w-[100px]">Correo:</label>
                    <Field
                      name="customer.email"
                      type="email"
                      className="flex-1 border border-gray-300 rounded px-3 py-2"
                    />
                    {errors.customer?.email && touched.customer?.email && (
                      <div className="text-red-600 text-sm">
                        {errors.customer.email}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-sm min-w-[100px]">Teléfono:</label>
                    <Field
                      name="customer.phone"
                      className="flex-1 border border-gray-300 rounded px-3 py-2"
                    />
                    {errors.customer?.phone && touched.customer?.phone && (
                      <div className="text-red-600 text-sm">
                        {errors.customer.phone}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-sm min-w-[100px]">Dirección:</label>
                    <Field
                      name="customer.address"
                      className="flex-1 border border-gray-300 rounded px-3 py-2"
                    />
                    {errors.customer?.address && touched.customer?.address && (
                      <div className="text-red-600 text-sm">
                        {errors.customer.address}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-span-12 md:col-span-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm min-w-[100px]">Localidad</label>
                    <Field
                      as="select"
                      name="location"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                      <option value="">Selecciona una localidad</option>
                      {locations.map((loc, index) => (
                        <option key={index} value={loc._id}>
                          {loc.name}
                        </option>
                      ))}
                    </Field>
                    {errors.location && touched.location && (
                      <div className="text-red-600 text-sm">
                        {errors.location}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm min-w-[100px]">
                      Fecha emisión
                    </label>
                    <Field
                      name="issueDate"
                      type="date"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    {errors.issueDate && touched.issueDate && (
                      <div className="text-red-600 text-sm">
                        {errors.issueDate}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm min-w-[100px]">
                      Guía de remisión
                    </label>
                    <Field
                      name="guideNumber"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    {errors.guideNumber && touched.guideNumber && (
                      <div className="text-red-600 text-sm">
                        {errors.guideNumber}
                      </div>
                    )}
                  </div>
                  <FieldArray name="paymentDetails">
                    <div className="flex items-center gap-2">
                      <label className="text-sm min-w-[100px]">
                        Forma de pago
                      </label>
                      <div className="flex gap-2 mt-1">
                        <select
                          onChange={(e) =>
                            setFieldValue("payment.method", e.target.value)
                          }
                          className="w-full border border-gray-300 rounded px-3 py-2"
                          value={values.payment.method}
                        >
                          <option value="">Seleccione</option>
                          {paymentMethods.map((paymentMethod, index) => (
                            <option value={paymentMethod._id} key={index}>
                              {paymentMethod.name}
                            </option>
                          ))}
                        </select>
                        <input
                          type="number"
                          placeholder="$"
                          onChange={(e) =>
                            setFieldValue("payment.value", e.target.value)
                          }
                          value={values.payment.value}
                          min={0}
                          className="w-32 border border-gray-300 rounded px-3 py-2"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const totalPayments = values.paymentDetails.reduce(
                              (total, payment) => total + payment.value,
                              0
                            );

                            const totalSale = values.saleDetails.reduce(
                              (total, item) =>
                                total +
                                item.quantity *
                                  item.unitValue *
                                  (1 - (item.discount || 0) / 100),
                              0
                            );

                            if (
                              totalPayments + Number(values.payment.value) >
                              totalSale
                            ) {
                              showInfo(
                                "El monto de pago no puede ser mayor que el total de la venta"
                              );
                              return;
                            }

                            const exists = values.paymentDetails.find(
                              (pd) => pd.id == values.payment.method
                            );
                            if (exists) return;
                            if (values.payment.method && values.payment.value) {
                              onAddPayment(
                                values,
                                setFieldValue,
                                values.payment.method,
                                values.payment.value
                              );
                            }
                          }}
                          className={`${
                            totalPayments === totalSale
                              ? "bg-gray-400 cursor-not-allowed" // Estilo para cuando el botón está deshabilitado
                              : "bg-gray-900 hover:bg-gray-800"
                          } text-white px-3 py-2 rounded`}
                          disabled={totalPayments === totalSale} // Deshabilitar el botón cuando la suma de pagos sea igual al total
                        >
                          +
                        </button>
                      </div>
                      {errors.paymentDetails && touched.paymentDetails && (
                        <div className="text-red-600 text-sm">
                          {errors.paymentDetails}
                        </div>
                      )}
                    </div>
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
                        values.paymentDetails.map((payment, index) => (
                          <tr key={index}>
                            <td className="px-3 py-2 capitalize font-medium">
                              {payment.paymentMethod}
                            </td>
                            <td className="px-3 py-2 text-right">
                              <input
                                type="number"
                                min={1}
                                value={payment.value}
                                step={0.001}
                                onChange={(e) => {
                                  const totalPayments =
                                    values.paymentDetails.reduce(
                                      (total, payment) => total + payment.value,
                                      0
                                    );

                                  const totalSale = values.saleDetails.reduce(
                                    (total, item) =>
                                      total +
                                      item.quantity *
                                        item.unitValue *
                                        (1 - (item.discount || 0) / 100),
                                    0
                                  );

                                  const remaining = totalSale - totalPayments;

                                  if (remaining <= 0) {
                                    showInfo(
                                      "No se puede agregar más pagos, el total ya ha sido cubierto"
                                    );
                                    return;
                                  }

                                  const newValue = parseFloat(e.target.value);
                                  if (newValue > remaining) {
                                    showInfo(
                                      "El pago no puede superar el monto restante"
                                    );
                                    return;
                                  }

                                  onUpdatePayment(
                                    values,
                                    setFieldValue,
                                    payment.id,
                                    newValue
                                  );
                                }}
                                className="w-15 text-right border border-gray-300 rounded px-1"
                              />
                            </td>
                            <td className="px-3 text-center">
                              <button
                                type="button"
                                className="text-red-600 hover:text-red-800"
                                title="Eliminar detalle pago"
                              >
                                <Trash2
                                  className="w-4 h-4"
                                  onClick={() => {
                                    onDeletePayment(
                                      values,
                                      setFieldValue,
                                      index
                                    );
                                  }}
                                />
                              </button>
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
                        const exists = values.saleDetails.find(
                          (p) => p.product === product.name
                        );
                        if (exists) return;
                        onAddProdcut(values, setFieldValue, product, 1);
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
                                  onChange={(e) => {
                                    onUpdateProduct(
                                      values,
                                      setFieldValue,
                                      e.target.value,
                                      item.id
                                    );
                                  }}
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
                                    onDeleteProduct(
                                      values,
                                      setFieldValue,
                                      index
                                    );
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
                    <span className="text-gray-900">${values.subtotal}</span>
                  </div>
                  <div>
                    Descuento: <span className="text-gray-900">$0.00</span>
                  </div>
                  <div>
                    Impuestos:{" "}
                    <span className="text-gray-900">${values.ivaTotal}</span>
                  </div>
                  <div className="text-xl font-bold mt-2">
                    TOTAL:{" "}
                    <span className="text-green-600">${values.total}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <button
                  type="reset"
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 disabled:bg-red-400 disabled:cursor-not-allowed"
                >
                  <Trash2 size={18} /> Limpiar datos
                </button>

                <button
                  type="submit"
                  className={`bg-gray-900 text-white px-4 py-2 rounded ${
                    !isValid || isTotalValid
                      ? "hover:bg-gray-800 cursor-not-allowed bg-gray-400"
                      : "hover:bg-gray-800"
                  }`}
                  disabled={!isValid || isTotalValid}
                >
                  Guardar
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
