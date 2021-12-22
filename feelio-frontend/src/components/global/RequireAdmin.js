import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Outlet } from "react-router-dom";

import { useAuth } from "../../hooks";

const RequireAdmin = ({ children }) => {
  let auth = useAuth();
  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    if (!auth?.user?.role_name === "admin" && !auth.isLoading) {
      navigate("/", { state: { from: location } });
    }
  }, [auth, location, navigate]);

  if (!auth.isLoading && auth.user) return <Outlet />;

  return null;
};

export default RequireAdmin;
