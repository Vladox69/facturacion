import { Plus } from "lucide-react";
import StaffForm from "../../components/staff/StaffForm";
import StaffTable from "../../components/staff/StaffTable";
import { showInfo } from "../../helpers/swal";

export default function StaffPage() {
  const staffList = [
    {
      _id: "1",
      name: "Marcelo Vladimir Aguacunchi Tuasa",
      identification: "0987910044",
      email: "vladimiragua52@gmail.com",
      role: "staff",
      active: true,
      location: "INSUMOS VLADIMIR",
    },
  ];
  /*
  const [staffList, setStaffList] = useState([
    {
      _id: "1",
      name: "Marcelo Vladimir Aguacunchi Tuasa",
      identification: "0987910044",
      email: "vladimiragua52@gmail.com",
      role: "staff",
      active: true,
      location: "INSUMOS VLADIMIR"
    },
  ]);

  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const saveStaff = (data) => {
    if (data._id) {
      setStaffList((prev) => prev.map((s) => (s._id === data._id ? data : s)));
    } else {
      setStaffList((prev) => [...prev, { ...data, _id: crypto.randomUUID() }]);
    }
    setShowForm(false);
    setEditing(null);
  };

  const deleteStaff = (id) => {
    if (confirm("¿Eliminar miembro del staff?")) {
      setStaffList((prev) => prev.filter((s) => s._id !== id));
    }
  };
*/

  const onDemo = () => {
    showInfo("Esta funcionalidad no está disponible en la modalidad demo.");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Staff</h1>
        <button
          onClick={onDemo}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          <Plus size={18} /> Añadir
        </button>
      </div>

      {/*showForm && (
        <div className="bg-white p-6 rounded-md">
          <h2 className="text-xl font-semibold">Registrar Staff</h2>
          <p className="text-gray-500 mb-4">
            Completa los campos para registrar personal.
          </p>
          <StaffForm
            onSave={saveStaff}
            editingStaff={editing}
            onCancel={() => {
              setShowForm(false);
              setEditing(null);
            }}
          />
        </div>
      )*/}

      <StaffTable
        staffList={staffList}
        onEdit={onDemo}
        onDelete={onDemo}
      />
    </div>
  );
}
