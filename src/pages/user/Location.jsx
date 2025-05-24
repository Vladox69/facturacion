import { useState } from "react";
import { Plus } from "lucide-react";
import LocationForm from "../../components/location/LocationForm";
import LocationTable from "../../components/location/LocationTable";

export default function LocationPage() {
  const [locations, setLocations] = useState([
    {
      _id: "1",
      name: "Sucursal Quito",
      phone: "022345678",
      code: "001",
      emissionPoint: "002",
      address: "Av. Amazonas y Naciones Unidas",
      business: "Empresa XYZ"
    }
  ]);

  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const saveLocation = (data) => {
    if (data._id) {
      setLocations((prev) => prev.map((l) => (l._id === data._id ? data : l)));
    } else {
      setLocations((prev) => [...prev, { ...data, _id: crypto.randomUUID() }]);
    }
    setShowForm(false);
    setEditing(null);
  };

  const deleteLocation = (id) => {
    if (confirm("¿Eliminar ubicación?")) {
      setLocations((prev) => prev.filter((l) => l._id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sucursales</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditing(null);
          }}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          <Plus size={18} /> Añadir Sucursal
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold">Crear Sucursal</h2>
          <p className="text-gray-500 mb-4">Completa los campos para registrar una nueva sucursal.</p>
          <LocationForm onSave={saveLocation} editingLocation={editing} onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }} />
        </div>
      )}

      <LocationTable locations={locations} onEdit={(l) => {
        setEditing(l);
        setShowForm(true);
      }} onDelete={deleteLocation} />
    </div>
  );
}
