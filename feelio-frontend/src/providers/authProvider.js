import { useState } from "react";
import { Auth } from "../api";

import { AuthContext } from "../contexts";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");

  const signin = (params, callback) => {
    Auth.Login(params)
      .then(({ data }) => {
        if (data.headers.error.toString() === "0") {
          setToken(data.body.token);
          localStorage.setItem("token", data.body.token);
          callback();
        }
      })
      .catch((e) => console.error(e));
  };

  const register = (params, callback) => {
    Auth.Register(params)
      .then(({ data }) => {
        if (data.headers.error.toString() === "0") {
          setToken(data.body.token);
          localStorage.setItem("token", data.body.token);
          callback();
        }
      })
      .catch((e) => console.error(e));
  };

  const signout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  let value = { token, signin, signout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
