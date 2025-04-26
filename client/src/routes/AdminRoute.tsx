import { Navigate} from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth/useAuth';
import React from 'react';
import Loading from '../utils/Loading/Loading';
import useAdmin from '../Hooks/useAdmin/UseAdmin';

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const { data, isLoading: isAdminLoading } = useAdmin();

  if (loading || isAdminLoading) {
    return <Loading />;
  }
  
  if (!user || data.user.role !== 'admin') {
    return <Navigate to="/login"  replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
