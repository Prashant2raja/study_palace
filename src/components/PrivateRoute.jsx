import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children, requireAdmin = false }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // If not authenticated, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If route requires admin and user is not admin, redirect to user dashboard
  if (requireAdmin && role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  // Authorized
  return children;
}
