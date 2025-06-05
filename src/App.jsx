import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { useAuthStore } from './hooks'; 
import routes from './routes';

function App() {
  const { status, checkAuthToken } = useAuthStore();
  const routing = useRoutes(routes);

  useEffect(() => {
    checkAuthToken(); 
  }, []);

  if (status === 'checking') {
    return <p>Cargando...</p>; // o spinner
  }

  return routing;
}

export default App;
