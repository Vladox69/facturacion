import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import DashboardLayout from "../components/DashboardLayout";
import Users from "../pages/admin/Users";
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
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
