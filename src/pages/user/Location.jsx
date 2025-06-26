import { Plus } from "lucide-react";
import LocationForm from "../../components/location/LocationForm";
import LocationTable from "../../components/location/LocationTable";
import { showInfo } from "../../helpers/swal";

export default function LocationPage() {

/*
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const saveLocation = () => {

  };

  const deleteLocation = () => {

  };*/

  const onDemo=()=>{
    showInfo("Esta funcionalidad no está disponible en la modalidad demo.");
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sucursales</h1>
        <button
          onClick={onDemo}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          <Plus size={18} /> Añadir Sucursal
        </button>
      </div>

      {/*showForm && (
        <div className="bg-white p-6 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold">Crear Sucursal</h2>
          <p className="text-gray-500 mb-4">Completa los campos para registrar una nueva sucursal.</p>
          <LocationForm onSave={onDemo} editingLocation={editing} onCancel={onDemo} />
        </div>
      )*/}

      <LocationTable onEdit={onDemo} onDelete={onDemo} />
    </div>
  );
}
