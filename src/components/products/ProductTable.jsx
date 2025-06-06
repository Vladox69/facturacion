import { Edit, Trash2 } from "lucide-react";

export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-md bg-white">
      <table className="w-full table-auto text-sm">
        <thead className="bg-gray-50 text-gray-600 font-semibold">
          <tr>
            <th className="p-3 text-left">Nombre</th>
            <th className="p-3 text-left">PVP</th>
            <th className="p-3 text-left">IVA</th>
            <th className="p-3 text-left">ICE</th>
            <th className="p-3 text-left">Negocio</th>
            <th className="p-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 divide-y divide-gray-100">
          {products.map((p) => (
            <tr key={p._id}>
              <td className="p-3">{p.name}</td>
              <td className="p-3">${p.pvp.toFixed(2)}</td>
              <td className="p-3">{p.iva}</td>
              <td className="p-3">{p.ice}</td>
              <td className="p-3">{p.business}</td>
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
        </tbody>
      </table>
    </div>
  );
}
