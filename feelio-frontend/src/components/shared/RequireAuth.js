import { Navigate, useLocation } from "react-router";

const RequireAuth = ({ children }) => {
  
  let location = useLocation();

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
