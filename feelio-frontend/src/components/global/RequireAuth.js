import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../hooks";

const RequireAuth = ({ children }) => {
  let auth = useAuth();
  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    if (!auth.token && !auth.isLoading) {
      navigate("/login", { state: { from: location } });
    }
  }, [auth, location, navigate]);

  return children;
};

export default RequireAuth;
