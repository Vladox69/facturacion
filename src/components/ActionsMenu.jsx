import { FileDown, CodeXml, Send, MoreVertical } from "lucide-react";
import { useEffect, useRef } from "react";

export default function ActionsMenu({ factura, openMenuId, setOpenMenuId }) {
  const isOpen = openMenuId === factura._id;
  const ref = useRef();

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpenMenuId]);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={() =>
          setOpenMenuId(isOpen ? null : factura._id)
        }
        className="flex items-center justify-center p-1 text-gray-700 hover:text-blue-600"
      >
        <MoreVertical size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded shadow-md z-10">
          <button
            onClick={() => console.log("Descargar PDF:", factura._id)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
          >
            <FileDown size={16} /> Descargar PDF
          </button>
          <button
            onClick={() => console.log("Descargar XML:", factura.invoiceUrl)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
          >
            <CodeXml size={16} /> Descargar XML
          </button>
          <button
            onClick={() => console.log("Enviar correo:", factura._id)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
          >
            <Send size={16} /> Enviar correo
          </button>
        </div>
      )}
    </div>
  );
}
