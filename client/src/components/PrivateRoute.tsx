import React, { useContext } from 'react';
import { AuthContext } from '../Hooks/contextApi/UserContext';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext is null');
  }

  const { user, valid } = authContext;
  return user && valid ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
