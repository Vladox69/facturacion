import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../hooks';

const ProtectedRoute = ({ children, role }) => {
  const { status, user } = useAuthStore();

  if (status === 'checking') {
    return <p className="text-center text-gray-600">Cargando...</p>;
  }

  if (status !== 'authenticated') {
    return <Navigate to="/login" />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/login" />;
  }
  console.log('acaa');
  
  return children;
};

export default ProtectedRoute;
