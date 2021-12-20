import React, { useEffect, useMemo, useReducer } from "react";
import { Auth } from "../api";

import { AuthContext } from "../contexts";

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            userToken: action.token,
            isLoggedin: true,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isLoggedin: false,
            userToken: null,
          };
        default:
          return {
            ...prevState,
          };
      }
    },
    {
      isLoading: true,
      isLoggedin: false,
      userToken: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let token = null;

      try {
        token = localStorage.getItem("token");
      } catch (e) {
        console.error(e);
      }

      dispatch({ type: "RESTORE_TOKEN", token });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      token: state.userToken,
      isLoading: state.isLoading,
      signin: async (data) => {
        let token = null;
        Auth.Login(data)
          .then(({ data }) => {
            if (data.headers.error.toString() === "0") {
              let { token: userToken } = data.body;
              localStorage.setItem("token", userToken);
              token = userToken;
            }
          })
          .catch((e) => console.error(e));

        dispatch({ type: "SIGN_IN", token });
      },
      signOut: async () => {
        dispatch({ type: "SIGN_OUT" });
      },
      register: async (data) => {
        let token = null;
        localStorage.setItem("token", token);
        dispatch({ type: "SIGN_IN", token });
      },
    }),
    [state.userToken, state.isLoading]
  );

  useEffect(() => {
    // console.log(authContext);
  }, [state]);

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
