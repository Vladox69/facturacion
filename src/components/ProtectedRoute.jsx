import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';

const ProtectedRoute = ({ role, redirectTo = "/login" }) => {
  const { status, user, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'checking') {
    return <p className="text-center text-gray-600">Cargando...</p>;
  }

  if (status !== 'authenticated') {
    return <Navigate to={redirectTo} />;
  }

  if (role && user?.role !== role) {
    return <Navigate to={`/${user.role.toLowerCase()}`} />;
  }

  return <Outlet />; // 👈 esto es clave
};

export default ProtectedRoute;
