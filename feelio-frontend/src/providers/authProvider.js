import { useState } from "react";
import { Auth } from "../api";

import { AuthContext } from "../contexts";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signin = (params, callback) => {
    Auth.Login(params)
      .then(({ data }) => {
        if (data.headers.error.toString() === "0") {
          const {token, ...authUser} = data.body;
          setUser(authUser);
          localStorage.setItem("token", token);
          callback();
        }
      })
      .catch((e) => console.error(e));
  };

  const register = (params, callback) => {
    Auth.Register(params)
      .then(({ data }) => {
        if (data.headers.error.toString() === "0") {
          const {token, ...authUser} = data.body;
          setUser(authUser);
          localStorage.setItem("token", token);
          callback();
        }
      })
      .catch((e) => console.error(e));
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  let value = { user, signin, signout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
