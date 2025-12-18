import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Logic: For now, we simulate "Not Logged In"
  // When you build your backend, this will check for a token or user session
  const isAuthenticated = false; 
  const location = useLocation();

  if (!isAuthenticated) {
    // If not logged in, send them to the login page
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};