import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import { useToast } from '../contexts/ToastContext';

const MatchmakerRoute: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  // If not a matchmaker, redirect to appropriate dashboard
  if (user?.role !== UserRole.MATCHMAKER) {
    if (user?.role === UserRole.ADMIN) {
      return <Navigate to="/admin" replace />;
    } else if (user?.role === UserRole.CANDIDATE) {
      return <Navigate to="/candidate" replace />;
    }
    return <Navigate to="/" replace />;
  }
  
  // Check if matchmaker is approved
  if (user.role === UserRole.MATCHMAKER && !user.approved) {
    showToast('Your account is pending approval by an administrator.', 'warning');
    return <Navigate to="/pending-approval" replace />;
  }

  // Render the matchmaker routes
  return <Outlet />;
};

export default MatchmakerRoute;