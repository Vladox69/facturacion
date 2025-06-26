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

const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="ADMIN">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "business",
        element: <Business />,
      },
    ],
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute role="USER">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "location",
        element: <LocationPage />,
      },
      {
        path: "staff",
        element: <StaffPage />,
      },
      {
        path: "products",
        element: <ProductPage />,
      },
      {
        path: "invoices",
        element: <GenerateInvoice />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
