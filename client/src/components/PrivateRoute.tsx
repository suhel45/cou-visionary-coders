import React, { useContext } from 'react';
import { AuthContext } from '../Hooks/contextApi/UserContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = () => {
  const authContext = useContext(AuthContext);
  const location = useLocation();

  if (!authContext) {
    throw new Error('AuthContext is not provided');
  }

  const { user, initializing, loading } = authContext;

  if (initializing || loading) {
    return <div>Loading authentication...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render child routes if authenticated
  return <Outlet />;
};

export default PrivateRoute;
