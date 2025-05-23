import { useState } from "react";
import UserForm from "../../components/users/UserForm";
import UserTable from "../../components/users/UserTable";
import { Plus } from "lucide-react";

export default function UserPage() {
  const [users, setUsers] = useState([
    { _id: "1", name: "Juan Pérez", email: "juan@correo.com", role: "ADMIN" },
    { _id: "2", name: "Ana López", email: "ana@correo.com", role: "USER" }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleSave = (user) => {
    if (user._id) {
      setUsers((prev) => prev.map((u) => (u._id === user._id ? user : u)));
    } else {
      const newUser = { ...user, _id: crypto.randomUUID() };
      setUsers((prev) => [...prev, newUser]);
    }
    setShowForm(false);
    setEditingUser(null);
  };

  const handleDelete = (id) => {
    if (confirm("¿Estás seguro?")) {
      setUsers((prev) => prev.filter((u) => u._id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Usuarios</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingUser(null);
          }}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          <Plus size={18} /> Añadir Usuario
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold">Crear Usuario</h2>
          <p className="text-gray-500 mb-4">Rellena los campos para registrar un usuario.</p>
          <UserForm onSave={handleSave} editingUser={editingUser} onCancel={() => {
            setShowForm(false);
            setEditingUser(null);
          }} />
        </div>
      )}

      <UserTable users={users} onEdit={(u) => {
        setEditingUser(u);
        setShowForm(true);
      }} onDelete={handleDelete} />
    </div>
  );
}
