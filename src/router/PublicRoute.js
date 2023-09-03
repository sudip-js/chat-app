import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const user = useSelector(({ auth }) => auth?.user);
  if (user?.firebase_uid) return <Navigate to="/chat" />;
  return <Outlet />;
};

export default PublicRoute;
