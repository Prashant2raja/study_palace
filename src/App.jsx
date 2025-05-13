import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import SeatBooking from './pages/SeatBooking';
import Payments from './pages/Payments';
import HelpDesk from './pages/HelpDesk';
import PrivateRoute from './components/PrivateRoute';
import UserProfile from './pages/UserProfile';
import AdminBooking from './pages/AdminBooking';
import EditUser from './pages/EditUser';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

export default function App() {
  const { pathname } = useLocation();

  // Hide navbar on login, signup, forgot-password and any /reset-password/:token
  const hidePaths = ['/login', '/signup', '/forgot-password'];
  const isResetRoute = pathname.startsWith('/reset-password/');
  const showNavbar = !hidePaths.includes(pathname) && !isResetRoute;

  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Password reset */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={<PrivateRoute><Dashboard /></PrivateRoute>}
        />
        <Route
          path="/profile"
          element={<PrivateRoute><Profile /></PrivateRoute>}
        />
        <Route
          path="/book"
          element={<PrivateRoute><SeatBooking /></PrivateRoute>}
        />
        <Route
          path="/helpdesk"
          element={<PrivateRoute><HelpDesk /></PrivateRoute>}
        />
        <Route
          path="/payments"
          element={<PrivateRoute><Payments /></PrivateRoute>}
        />

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={<PrivateRoute requireAdmin><UserProfile /></PrivateRoute>}
        />
        <Route
          path="/admin/book"
          element={<PrivateRoute><SeatBooking /></PrivateRoute>}
        />
        <Route
          path="/admin/edit-user/:id"
          element={<PrivateRoute requireAdmin><EditUser /></PrivateRoute>}
        />

        {/* Redirects */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
