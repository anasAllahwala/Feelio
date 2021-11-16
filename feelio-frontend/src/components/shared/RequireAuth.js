import { useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../hooks";

const RequireAuth = ({ children }) => {
  let auth = useAuth();
  let location = useLocation();
  useEffect(() => {
    if (!auth.user) {
      return <Navigate to="/login" state={{ from: location }} />;
    }
  }, [auth, location])

  return children;
};

export default RequireAuth;
