import { Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useBusinessStore, useProductStore } from "../../hooks";
import { showLoading } from "../../helpers/swal";
import Swal from "sweetalert2";

export default function ProductTable({ onEdit, onDelete }) {
  const { business } = useBusinessStore();
  const { products, startLoadingProducts } = useProductStore();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    startLoadingProducts({ _id: business._id });
  }, []);

  useEffect(() => {
    if (products.length === 0) {
      showLoading("Cargando productos...");
    } else {
      Swal.close();
    }
  }, [products]);

  const totalPages = Math.ceil(products.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="rounded-md bg-white shadow border border-gray-200">
      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-50 text-gray-600 font-semibold">
            <tr>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">PVP</th>
              <th className="p-3 text-left">IVA</th>
              <th className="p-3 text-left">ICE</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y divide-gray-100">
            {currentProducts.map((p) => (
              <tr key={p._id}>
                <td className="p-3">{p.name}</td>
                <td className="p-3">${p.pvp.toFixed(2)}</td>
                <td className="p-3">{p.iva?.description || "-"}</td>
                <td className="p-3">{p.ice?.description || "-"}</td>
                <td className="p-3 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(p)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(p._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {currentProducts.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  No hay productos disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginador */}
      {products.length > rowsPerPage && (
        <div className="flex justify-between items-center p-4 border-t border-gray-200 bg-gray-50 text-sm text-gray-700">
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
