import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth/useAuth';

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;