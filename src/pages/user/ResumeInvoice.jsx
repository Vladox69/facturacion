import { useInvoiceStore } from "../../hooks";

export default function ResumeInvoice() {
  const { invoiceHTML } = useInvoiceStore();

  if (Object.keys(invoiceHTML).length === 0) {
    return <p className="text-gray-500">No hay datos disponibles.</p>;
  }

  const {
    location,
    customer,
    issueDate,
    paymentDetails,
    saleDetails,
    subtotal,
    ivaTotal,
    total,
  } = invoiceHTML;

  return (
    <div className="bg-white text-gray-900 p-6 space-y-6 min-h-screen">
      <div className="text-2xl font-semibold border-b border-gray-300 pb-3">
        Generar Factura
      </div>
      <div className="mx-auto bg-white text-gray-900 p-6 rounded-lg">
        {/* Encabezado */}
        <header className="flex justify-between border-b pb-4 mb-4">
          <div>
            <h2 className="text-xl font-bold">{location.name}</h2>
            <p className="text-sm">
              <strong>Dirección:</strong> {location.address}
            </p>
            <p className="text-sm">
              <strong>Teléfono:</strong> {location.phone}
            </p>
            <p className="text-sm">
              <strong>Establecimiento:</strong> {location.code} - Punto de
              Emisión: {location.emissionPoint}
            </p>
          </div>
          <div className="text-right">
            <h3 className="text-lg font-semibold">Factura</h3>
            <p className="text-sm">
              <strong>Fecha:</strong> {issueDate}
            </p>
          </div>
        </header>

        {/* Cliente */}
        <section className="mb-6">
          <h4 className="text-lg font-semibold mb-2">Datos del Cliente</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <p>
              <strong>Nombre:</strong> {customer.fullName}
            </p>
            <p>
              <strong>Identificación:</strong> {customer.identification}
            </p>
            <p>
              <strong>Correo:</strong> {customer.email}
            </p>
            <p>
              <strong>Dirección:</strong> {customer.address}
            </p>
            <p>
              <strong>Tipo de ID:</strong>{" "}
              {customer.identificationType?.description}
            </p>
          </div>
        </section>

        {/* Detalles de venta */}
        <section className="mb-6">
          <h4 className="text-lg font-semibold mb-2">Detalle de Productos</h4>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border text-sm">
              <thead className="">
                <tr>
                  <th className="border px-3 py-2 text-left">Producto</th>
                  <th className="border px-3 py-2 text-right">Cantidad</th>
                  <th className="border px-3 py-2 text-right">P/U</th>
                  <th className="border px-3 py-2 text-right">IVA</th>
                  <th className="border px-3 py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {saleDetails.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-3 py-1">{item.product}</td>
                    <td className="border px-3 py-1 text-right">
                      {item.quantity}
                    </td>
                    <td className="border px-3 py-1 text-right">
                      ${item.unitValue.toFixed(2)}
                    </td>
                    <td className="border px-3 py-1 text-right">
                      ${item.totalTaxes.toFixed(2)}
                    </td>
                    <td className="border px-3 py-1 text-right">
                      ${item.totalValue.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Totales */}
        <section className="mb-6">
          <h4 className="text-lg font-semibold mb-2">Resumen de Totales</h4>
          <div className="flex justify-end">
            <table className="text-sm w-full sm:w-1/2">
              <tbody>
                <tr>
                  <td className="py-1 font-medium">Subtotal</td>
                  <td className="py-1 text-right">${subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="py-1 font-medium">IVA</td>
                  <td className="py-1 text-right">${ivaTotal.toFixed(2)}</td>
                </tr>
                <tr className="border-t font-bold">
                  <td className="py-1">Total</td>
                  <td className="py-1 text-right">${total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Formas de pago */}
        <section className="mb-6">
          <h4 className="text-lg font-semibold mb-2">Formas de Pago</h4>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border text-sm">
              <thead className="">
                <tr>
                  <th className="border px-3 py-2 text-left">Método</th>
                  <th className="border px-3 py-2 text-right">Valor</th>
                </tr>
              </thead>
              <tbody>
                {paymentDetails.map((p, i) => (
                  <tr key={i}>
                    <td className="border px-3 py-1">{p.paymentMethod}</td>
                    <td className="border px-3 py-1 text-right">
                      ${parseFloat(p.value).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="text-xs text-center text-gray-500 mt-8">
          Factura generada electrónicamente. Gracias por su compra.
        </footer>
      </div>
    </div>
  );
}
