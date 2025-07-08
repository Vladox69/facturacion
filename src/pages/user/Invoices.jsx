import { useEffect, useState } from "react";
import { useBusinessStore, useSaleStore } from "../../hooks";
import ActionsMenu from "../../components/ActionsMenu";
import { showLoading } from "../../helpers/swal";
import Swal from "sweetalert2";

export default function Invoices() {
  const { business } = useBusinessStore();
  const { sales, startLoadingSales } = useSaleStore();
  const [openMenuId, setOpenMenuId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    startLoadingSales({ _id: business._id });
  }, []);

  useEffect(() => {
    if (sales.length == 0) {
      showLoading("Cargando facturas...");
    } else {
      Swal.close();
    }
  }, [sales]);

  // Lógica de paginación
  const totalPages = Math.ceil(sales.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const currentData = sales.slice(startIdx, startIdx + rowsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-white text-gray-900 p-6 space-y-6 min-h-screen">
      <div className="text-2xl font-semibold border-b border-gray-300 pb-3">
        Facturas
      </div>

      <div className="rounded-md bg-white shadow-sm overflow-visible relative">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-50 text-gray-600 font-semibold">
            <tr>
              <th className="p-3 text-left">Número de factura</th>
              <th className="p-3 text-left">Fecha</th>
              <th className="p-3 text-left">Identificación</th>
              <th className="p-3 text-left">Cliente</th>
              <th className="p-3 text-right">Total sin impuestos</th>
              <th className="p-3 text-right">Total impuestos</th>
              <th className="p-3 text-right">Total</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y divide-gray-100">
            {currentData.map((factura) => {
              const totalImpuestos =
                factura.totalAmount - factura.totalWithoutTaxes;

              return (
                <tr key={factura._id}>
                  <td className="p-3">
                    {factura.location.code}-{factura.location.emissionPoint}-
                    {factura.sequential}
                  </td>
                  <td className="p-3">{factura.issueDate}</td>
                  <td className="p-3">{factura.customer.identification}</td>
                  <td className="p-3">{factura.customer.fullName}</td>
                  <td className="p-3 text-right">
                    ${factura.totalWithoutTaxes.toFixed(2)}
                  </td>
                  <td className="p-3 text-right">
                    ${totalImpuestos.toFixed(2)}
                  </td>
                  <td className="p-3 text-right">
                    ${factura.totalAmount.toFixed(2)}
                  </td>
                  <td className="p-3 text-center">
                    <ActionsMenu
                      factura={factura}
                      openMenuId={openMenuId}
                      setOpenMenuId={setOpenMenuId}
                    />
                  </td>
                </tr>
              );
            })}
            {sales.length === 0 && (
              <tr>
                <td colSpan={8} className="p-4 text-center text-gray-500">
                  No hay resultados disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Paginador */}
        {sales.length > rowsPerPage && (
          <div className="flex justify-between items-center p-4">
            <span className="text-sm text-gray-500">
              Página {currentPage} de {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
