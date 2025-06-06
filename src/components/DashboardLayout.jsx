import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Menu,
  Users,
  Building,
  Settings as SettingsIcon,
  LayoutDashboard,
  User as UserIcon,
  Briefcase,
  UserCog,
  Package,
  FileText,
  LogOut
} from "lucide-react";
import { useAuthStore } from "../hooks";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const { startLogout,user } = useAuthStore();
  // Detectar rol según ruta
  const rolePath = location.pathname.startsWith("/admin")
    ? "admin"
    : location.pathname.startsWith("/user")
    ? "user"
    : "guest";

  // Menús por rol
  const navItemsByRole = {
    admin: [
      { name: "Usuarios", icon: <Users size={20} />, path: "/admin/users" },
      {
        name: "Empresas",
        icon: <Building size={20} />,
        path: "/admin/business",
      },
      {
        name: "Configuración",
        icon: <SettingsIcon size={20} />,
        path: "/admin/settings",
      },
    ],
    user: [
      {
        name: "Mi Perfil",
        icon: <UserIcon size={20} />,
        path: "/user/profile",
      },
      {
        name: "Facturas",
        icon: <FileText size={20} />,
        path: "/user/invoices",
      },
      {
        name: "Localidades",
        icon: <Briefcase size={20} />,
        path: "/user/location",
      },
      {
        name: "Productos",
        icon: <Package size={20} />,
        path: "/user/products",
      },
      { name: "Personal", icon: <UserCog size={20} />, path: "/user/staff" },
    ],
    guest: [{ name: "Inicio", icon: <LayoutDashboard size={20} />, path: "/" }],
  };

  const navItems = navItemsByRole[rolePath];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-md p-4 transition-all flex flex-col ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          {isOpen && <LayoutDashboard className="text-indigo-600" />}
          <button onClick={() => setIsOpen(!isOpen)}>
            <Menu size={24} />
          </button>
        </div>
        {isOpen&&<p> {user.name} </p>}
        <nav className="flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              to={item.path}
              key={item.name}
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-gray-200 transition ${
                location.pathname === item.path
                  ? "bg-gray-200 font-semibold"
                  : ""
              }`}
            >
              {item.icon}
              {isOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t">
          <button
            onClick={startLogout}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-200 transition w-full"
          >
            <LogOut size={20} />
            {isOpen && <span>Cerrar sesión</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
