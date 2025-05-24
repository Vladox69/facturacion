import { Edit, Trash2 } from "lucide-react";

export default function LocationTable({ locations, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-md bg-white shadow-sm">
      <table className="w-full table-auto text-sm">
        <thead className="bg-gray-50 text-gray-600 font-semibold">
          <tr>
            <th className="p-3 text-left">Nombre</th>
            <th className="p-3 text-left">Código</th>
            <th className="p-3 text-left">Punto Emisión</th>
            <th className="p-3 text-left">Teléfono</th>
            <th className="p-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 divide-y divide-gray-100">
          {locations.map((l) => (
            <tr key={l._id}>
              <td className="p-3">{l.name}</td>
              <td className="p-3">{l.code}</td>
              <td className="p-3">{l.emissionPoint}</td>
              <td className="p-3">{l.phone}</td>
              <td className="p-3 text-center">
                <div className="flex justify-center gap-2">
                  <button onClick={() => onEdit(l)} className="text-blue-600 flex items-center gap-1 hover:underline">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => onDelete(l._id)} className="text-red-600 flex items-center gap-1 hover:underline">
                    <Trash2 size={16} />
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
