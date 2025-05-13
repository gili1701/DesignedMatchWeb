import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

const CandidateRoute: React.FC = () => {
  const { user } = useAuth();

  // If not a candidate, redirect to appropriate dashboard
  if (user?.role !== UserRole.CANDIDATE) {
    if (user?.role === UserRole.ADMIN) {
      return <Navigate to="/admin" replace />;
    } else if (user?.role === UserRole.MATCHMAKER) {
      return <Navigate to="/matchmaker" replace />;
    }
    return <Navigate to="/" replace />;
  }

  // Render the candidate routes
  return <Outlet />;
};

export default CandidateRoute;