import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks";

const Navbar = ({ title }) => {
  let auth = useAuth();

  return (
    <div className="flex justify-between">
      <h1>{title}</h1>
      {!auth.user ? (
        <nav>
          <Link className="mr-2" to="/login">
            Login
          </Link>
          <Link to="/register">Register</Link>
        </nav>
      ) : null}
    </div>
  );
};

export default Navbar;
