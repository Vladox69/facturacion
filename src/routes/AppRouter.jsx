import { useEffect } from "react";
import { useAuthStore } from "../hooks";
import { Route, Routes, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import DashboardLayout from "../components/DashboardLayout";
import Users from "../pages/admin/Users";
import Business from "../pages/admin/Business";
import LocationPage from "../pages/user/Location";
import StaffPage from "../pages/user/Staff";
import ProductPage from "../pages/user/Product";
import GenerateInvoice from "../pages/user/GenerateInvoice";

export const AppRouter = () => {
  const { status, checkAuthToken, user } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <h1>Cargando...</h1>;
  }

  if (status === "not-authenticated") {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {/* Ruta pública de login */}
      <Route path="/login" element={<Login />} />

      {/* Rutas para ADMIN */}
      <Route path="/admin" element={<DashboardLayout />}>
        {user?.role === "ADMIN" ? (
          <>
            <Route path="users" element={<Users />} />
            <Route path="business" element={<Business />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Route>

      {/* Rutas para USER */}
      <Route path="/user" element={<DashboardLayout />}>
        {user?.role === "USER" ? (
          <>
            <Route path="location" element={<LocationPage />} />
            <Route path="staff" element={<StaffPage />} />
            <Route path="products" element={<ProductPage />} />
            <Route path="invoices" element={<GenerateInvoice />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Route>

      {/* Catch-all para rutas no definidas */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
