import { useState } from "react";
import { Trash2 } from "lucide-react";

export default function GenerateInvoice() {
  const [formaPago, setFormaPago] = useState("");
  const [monto, setMonto] = useState("");

  return (
    <div className="bg-white text-gray-900 p-6 space-y-6 min-h-screen">
      {/* Encabezado */}
      <div className="text-2xl font-semibold border-b border-gray-300 pb-3">
        Generar Factura
      </div>

      {/* Datos de cliente (8 columnas) y cabecera derecha (4 columnas) */}
      <div className="grid grid-cols-12 gap-6">
        {/* Columna izquierda: Datos del cliente */}
        <div className="col-span-12 md:col-span-7 space-y-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700 min-w-[100px]">CI/RUC:</label>
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700 min-w-[100px]">Nombres:</label>
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700 min-w-[100px]">Correo:</label>
            <input
              type="email"
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700 min-w-[100px]">Teléfono:</label>
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700 min-w-[100px]">Dirección:</label>
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-gray-500"
            />
          </div>
        </div>

        {/* Columna derecha: Totales, forma de pago, fecha */}
        <div className="col-span-12 md:col-span-5 space-y-4">
          <div>
            <label className="text-sm text-gray-700">Fecha emisión</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-gray-500"
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div>
            <label className="text-sm text-gray-700">Guía de remisión</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-gray-500"
            />
          </div>
          <div>
            <label className="text-sm text-gray-700">Forma de pago</label>
            <div className="flex gap-2 mt-1">
              <select
                value={formaPago}
                onChange={(e) => setFormaPago(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-gray-500"
              >
                <option value="">Seleccione</option>
                <option value="efectivo">Efectivo</option>
                <option value="tarjeta">Tarjeta</option>
                <option value="transferencia">Transferencia</option>
              </select>
              <input
                type="number"
                placeholder="$"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                className="w-32 border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-gray-500"
              />
              <button className="bg-gray-900 text-white px-3 py-2 rounded hover:bg-gray-800">
                +
              </button>
            </div>
          </div>
          <div>
            <button className="w-full bg-gray-900 text-white px-3 py-2 rounded hover:bg-gray-800">
              Datos adicionales
            </button>
          </div>
        </div>
      </div>

      {/* Buscador de productos */}
      <div className="mt-6">
        <input
          type="text"
          placeholder="Buscar producto para agregar"
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-gray-500"
        />
      </div>

      {/* Tabla de productos */}
      <div className="overflow-x-auto border-t border-gray-300 mt-4">
        <table className="w-full text-sm">
          <thead className="text-gray-600 border-b border-gray-300">
            <tr>
              <th className="py-2 text-left">N.</th>
              <th className="text-left">Producto</th>
              <th className="text-right">Cantidad</th>
              <th className="text-right">Precio</th>
              <th className="text-right">P. Esp.</th>
              <th className="text-right">Desc. %</th>
              <th className="text-right">Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {/* Aquí van los productos agregados */}
          </tbody>
        </table>
      </div>

      {/* Resumen de factura */}
      <div className="flex justify-end gap-10 text-sm text-gray-600 border-t border-gray-300 pt-4">
        <div className="space-y-1 text-right">
          <div>Subtotal sin imp.: <span className="text-gray-900">$0.00</span></div>
          <div>Descuento: <span className="text-gray-900">$0.00</span></div>
          <div>Impuestos: <span className="text-gray-900">$0.00</span></div>
          <div className="text-xl font-bold mt-2">TOTAL: <span className="text-green-600">$0.00</span></div>
        </div>
      </div>

      {/* Botones finales */}
      <div className="flex justify-between items-center mt-6">
        <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500">
          <Trash2 size={18} /> Limpiar datos
        </button>
        <button className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800">
          Guardar
        </button>
      </div>
    </div>
  );
}
