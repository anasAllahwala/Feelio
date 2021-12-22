import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../hooks";

const RequireAuth = ({ children }) => {
  let auth = useAuth();
  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    if (!auth.user && !auth.isLoading) {
      navigate("/login", { state: { from: location } });
    }
  }, [auth, location, navigate]);

  if (!auth.isLoading && auth.user) return children;

  return null;
};

export default RequireAuth;
