import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Menu,
  Users,
  Settings as SettingsIcon,
  LayoutDashboard,
} from "lucide-react";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { name: "Usuarios", icon: <Users size={20} />, path: "/admin/user" },
    { name: "Configuración", icon: <SettingsIcon size={20} />, path: "/admin/settings" }
  ];

  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <aside className={`bg-white shadow-md p-4 transition-all ${isOpen ? "w-64" : "w-16"}`}>
        <div className="flex items-center justify-between mb-6">
          {isOpen && <LayoutDashboard className="text-indigo-600" />}
          <button onClick={() => setIsOpen(!isOpen)}>
            <Menu size={24} />
          </button>
        </div>
        <nav className="flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              to={item.path}
              key={item.name}
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-gray-200 transition ${
                location.pathname === item.path ? "bg-gray-200 font-semibold" : ""
              }`}
            >
              {item.icon}
              {isOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
