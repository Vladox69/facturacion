import { Edit, Trash2 } from "lucide-react";

export default function StaffTable({ staffList, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-md bg-white">
      <table className="w-full table-auto text-sm">
        <thead className="bg-gray-50 text-gray-600 font-semibold">
          <tr>
            <th className="p-3 text-left">Nombre</th>
            <th className="p-3 text-left">Identificación</th>
            <th className="p-3 text-left">Correo</th>
            <th className="p-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 divide-y divide-gray-100">
          {staffList.map((s) => (
            <tr key={s._id}>
              <td className="p-3">{s.name}</td>
              <td className="p-3">{s.identification}</td>
              <td className="p-3">{s.email}</td>
              <td className="p-3 text-center">
                <div className="flex justify-center gap-3">
                  <button onClick={() => onEdit(s)} className="text-blue-600 hover:text-blue-800">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => onDelete(s._id)} className="text-red-600 hover:text-red-800">
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
