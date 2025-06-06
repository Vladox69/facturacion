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
import ProtectedRoute from "../components/ProtectedRoute";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* ADMIN */}
      <Route element={<ProtectedRoute role="ADMIN" />}>
        <Route path="/admin" element={<DashboardLayout />}>
          <Route path="users" element={<Users />} />
          <Route path="business" element={<Business />} />
        </Route>
      </Route>

      {/* USER */}
      <Route element={<ProtectedRoute role="USER" />}>
        <Route path="/user" element={<DashboardLayout />}>
          <Route path="location" element={<LocationPage />} />
          <Route path="staff" element={<StaffPage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="invoices" element={<GenerateInvoice />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
