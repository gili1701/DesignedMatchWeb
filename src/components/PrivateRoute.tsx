import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state (you could add a spinner here)
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  // If not authenticated, redirect to login with return url
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render the protected routes
  return <Outlet />;
};

export default PrivateRoute;