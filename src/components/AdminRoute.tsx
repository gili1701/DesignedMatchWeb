import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

const AdminRoute: React.FC = () => {
  const { user } = useAuth();

  // If not an admin, redirect to appropriate dashboard
  if (user?.role !== UserRole.ADMIN) {
    if (user?.role === UserRole.MATCHMAKER) {
      return <Navigate to="/matchmaker" replace />;
    } else if (user?.role === UserRole.CANDIDATE) {
      return <Navigate to="/candidate" replace />;
    }
    return <Navigate to="/" replace />;
  }

  // Render the admin routes
  return <Outlet />;
};

export default AdminRoute;