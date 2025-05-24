import { useState } from "react";
import { MoreVertical, Edit, Trash2 } from "lucide-react";

export default function UserTable({ users, onEdit, onDelete }) {

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
              <td className="p-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(user._id)}
                    className="flex items-center gap-1 text-sm text-red-600 hover:underline"
                  >
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
