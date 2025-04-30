import { Navigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth/useAuth';
import React from 'react';
import Loading from '../utils/Loading/Loading';

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
