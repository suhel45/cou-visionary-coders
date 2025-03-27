import React, { useContext } from 'react';
import { AuthContext } from '../Hooks/contextApi/UserContext';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext is null');
  }

  const { user } = authContext;
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
