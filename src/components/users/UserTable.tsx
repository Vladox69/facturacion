import { useState } from "react";
import { MoreVertical, Edit, Trash2 } from "lucide-react";

export default function UserTable({ users, onEdit, onDelete }) {
  const [openMenuId, setOpenMenuId] = useState(null);

  return (
    <div className="overflow-hidden rounded-md bg-white shadow-sm">
      <table className="w-full table-auto">
        <thead className="bg-gray-50 text-gray-600 text-sm font-semibold">
          <tr>
            <th className="p-4 text-left">Nombre</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Rol</th>
            <th className="p-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
          {users.map((user) => (
            <tr key={user._id}>
              <td className="p-4">{user.name}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.role}</td>
              <td className="p-4 text-center relative">
                <button
                  onClick={() => setOpenMenuId(openMenuId === user._id ? null : user._id)}
                  className="hover:bg-gray-100 rounded-full p-2"
                >
                  <MoreVertical size={18} />
                </button>

                {openMenuId === user._id && (
                  <div className="absolute right-6 top-10 z-10 bg-white shadow-md rounded-md border w-40">
                    <div className="px-3 py-2 text-gray-600 border-b text-sm font-semibold">Acciones</div>
                    <button
                      onClick={() => {
                        onEdit(user);
                        setOpenMenuId(null);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    >
                      <Edit size={16} /> Editar
                    </button>
                    <button
                      onClick={() => {
                        onDelete(user._id);
                        setOpenMenuId(null);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                    >
                      <Trash2 size={16} /> Eliminar
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
