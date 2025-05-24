import { Edit, Trash2 } from "lucide-react";

export default function BusinessTable({ businesses, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-md bg-white shadow-sm">
      <table className="w-full table-auto text-sm">
        <thead className="bg-gray-50 text-gray-600 font-semibold">
          <tr>
            <th className="p-3 text-left">Razón Social</th>
            <th className="p-3 text-left">RUC</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 divide-y divide-gray-100">
          {businesses.map((b) => (
            <tr key={b._id}>
              <td className="p-3">{b.businessName}</td>
              <td className="p-3">{b.taxId}</td>
              <td className="p-3">{b.email}</td>
              <td className="p-3 text-center">
                <div className="flex justify-center gap-2">
                  <button onClick={() => onEdit(b)} className="text-blue-600 flex items-center gap-1 hover:underline">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => onDelete(b._id)} className="text-red-600 flex items-center gap-1 hover:underline">
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
