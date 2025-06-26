import { ColumnChart } from "react-chartkick";
import "chartkick/chart.js";
import { useBusinessStore, useSaleStore } from "../../hooks";
import { useEffect } from "react";
import { showLoading } from "../../helpers/swal";
import Swal from "sweetalert2";
import {
  Aperture,
  FilePlus,
  FileText,
  Briefcase,
  Package,
  UserCog,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Board() {
  const { business } = useBusinessStore();
  const { topCustomers, topProducts, startLoadingCharts } = useSaleStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (business?._id) {
      startLoadingCharts({ _id: business._id });
    }
  }, [business]);

  useEffect(() => {
    if (topCustomers.length === 0 && topProducts.length === 0) {
      showLoading("Cargando gráficos...");
    } else {
      Swal.close();
    }
  }, [topCustomers, topProducts]);

  const customerData = topCustomers.map((c) => [c.name, c.totalSpent]);
  const productData = topProducts.map((p) => [p.name, p.quantitySold]);

  const routes = [
    {
      name: "Dashboard",
      icon: <Aperture size={24} />,
      path: "/user/",
      description:
        "Visualiza un resumen interactivo de tus ventas, productos y clientes destacados. Ideal para una visión rápida del rendimiento del negocio.",
    },
    {
      name: "Generar factura",
      icon: <FilePlus size={24} />,
      path: "/user/generate-invoice",
      description:
        "Accede al módulo para emitir facturas electrónicas con total facilidad. Puedes seleccionar cliente, productos y visualizar totales.",
    },
    {
      name: "Facturas",
      icon: <FileText size={24} />,
      path: "/user/invoices",
      description:
        "Consulta todas las facturas emitidas con filtros por fecha, estado o cliente. Descarga XML, PDF y reenvía por correo.",
    },
    {
      name: "Localidades",
      icon: <Briefcase size={24} />,
      path: "/user/location",
      description:
        "Administra tus sucursales y puntos de emisión. Configura datos como dirección, código y teléfono de cada sede.",
    },
    {
      name: "Productos",
      icon: <Package size={24} />,
      path: "/user/products",
      description:
        "Gestiona tu catálogo de productos incluyendo PVP, impuestos aplicables y categorías. Puedes editarlos fácilmente.",
    },
    {
      name: "Personal",
      icon: <UserCog size={24} />,
      path: "/user/staff",
      description:
        "Configura usuarios autorizados para operar en el sistema. Asigna roles y controla el acceso por módulo.",
    },
  ];

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">Panel de Control</h1>

      {/* Gráficas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Clientes que más compran</h2>
          <ColumnChart data={customerData} xtitle="Cliente" ytitle="Total gastado" />
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Productos más vendidos</h2>
          <ColumnChart data={productData} xtitle="Producto" ytitle="Cantidad vendida" />
        </div>
      </div>

      {/* Cards de navegación */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
        {routes.map((route) => (
          <div
            key={route.name}
            onClick={() => navigate(route.path)}
            className="bg-white border border-gray-200 rounded-lg p-5 shadow hover:shadow-md transition cursor-pointer group h-full"
          >
            <div className="flex items-center gap-3 text-blue-700 mb-3">
              {route.icon}
              <h3 className="text-lg font-semibold group-hover:underline">
                {route.name}
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">{route.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
