import { Plus } from "lucide-react";
import ProductForm from "../../components/products/ProductForm";
import ProductTable from "../../components/products/ProductTable";
import { showInfo } from "../../helpers/swal";

export default function ProductPage() {
  /*
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const saveProduct = (product) => {
    if (product._id) {
      console.log(product);
    }
    setShowForm(false);
    setEditing(null);
  };

  const deleteProduct = (id) => {
    if (confirm("¿Eliminar producto?")) {
      console.log(id);
    }
  };
*/
  const onDemo = () => {
    showInfo("Esta funcionalidad no está disponible en la modalidad demo.");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Productos</h1>
        <button
          onClick={onDemo}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          <Plus size={18} /> Añadir Producto
        </button>
      </div>

      {/*showForm && (
        <div className="bg-white p-6 rounded-md">
          <h2 className="text-xl font-semibold">Registrar Producto</h2>
          <p className="text-gray-500 mb-4">
            Completa los campos para registrar un nuevo producto.
          </p>
          <ProductForm
            onSave={saveProduct}
            editingProduct={editing}
            onCancel={() => {
              setShowForm(false);
              setEditing(null);
            }}
          />
        </div>
      )*/}

      <ProductTable
        onEdit={onDemo}
        onDelete={onDemo}
      />
    </div>
  );
}
