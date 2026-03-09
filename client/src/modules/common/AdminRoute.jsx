import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // Check if user is logged in AND is an Admin
  if (userInfo && userInfo.type === 'Admin') {
    return <Outlet />;
  }

  // Otherwise, redirect to login or home
  return <Navigate to="/login" replace />;
};

export default AdminRoute;
