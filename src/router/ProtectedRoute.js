import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const user = useSelector(({ auth }) => auth?.user);
  if (user?.firebase_uid) return <Outlet />;
  return <Navigate to="/" />;
};

export default ProtectedRoute;
