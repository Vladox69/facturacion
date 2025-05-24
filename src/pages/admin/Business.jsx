import { useState } from "react";
import { Plus } from "lucide-react";
import BusinessForm from "../../components/business/BusinessForm";
import BusinessTable from "../../components/business/BusinessTable";

export default function BusinessPage() {
  const [businesses, setBusinesses] = useState([
    {
      _id: "1",
      businessName: "Tech Solutions S.A.",
      tradeName: "TechSol",
      taxId: "1790012345001",
      email: "contacto@techsol.com",
      password: "",
      issuesRetention: true,
      accountingRequired: false,
      certificateUrl: "https://example.com/cert.p12",
      certificateKey: "clave123",
      user: "usuario1",
    },
  ]);

  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const saveBusiness = (data) => {
    if (data._id) {
      setBusinesses((prev) => prev.map((b) => (b._id === data._id ? data : b)));
    } else {
      setBusinesses((prev) => [...prev, { ...data, _id: crypto.randomUUID() }]);
    }
    setShowForm(false);
    setEditing(null);
  };

  const deleteBusiness = (id) => {
    if (confirm("¿Eliminar empresa?")) {
      setBusinesses((prev) => prev.filter((b) => b._id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Empresas</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditing(null);
          }}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          <Plus size={18} /> Añadir Empresa
        </button>
      </div>

      {showForm && (
        <div className="bg-white  p-6 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold">Crear Empresa</h2>
          <p className="text-gray-500 mb-4">Completa los campos para registrar una nueva empresa.</p>
          <BusinessForm onSave={saveBusiness} editingBusiness={editing} onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }} />
        </div>
      )}

      <BusinessTable businesses={businesses} onEdit={(b) => {
        setEditing(b);
        setShowForm(true);
      }} onDelete={deleteBusiness} />
    </div>
  );
}
