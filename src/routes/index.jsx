import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import DashboardLayout from "../components/DashboardLayout";
import Users from "../pages/admin/Users";
import Business from "../pages/admin/Business";
import LocationPage from "../pages/user/Location";
import StaffPage from "../pages/user/Staff";

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <DashboardLayout />,
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
    element: <DashboardLayout />,
    children: [
      {
        path: "location",
        element: <LocationPage />,
      },
      {
        path: "staff",
        element: <StaffPage />,
      }
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
