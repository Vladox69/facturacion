import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore, useBusinessStore } from '../hooks';
import { useEffect } from 'react';

const ProtectedRoute = ({ role, redirectTo = "/login" }) => {
  const { status, user, checkAuthToken } = useAuthStore();
  const { startLoadingBusinessFromLocalStorage } = useBusinessStore();
  useEffect(() => {
    checkAuthToken();
    startLoadingBusinessFromLocalStorage();
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

  return <Outlet />;
};

export default ProtectedRoute;
