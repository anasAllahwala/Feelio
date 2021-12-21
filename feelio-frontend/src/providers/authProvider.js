import React, { useEffect, useMemo, useReducer, useState } from "react";
import { Auth } from "../api";

import { AuthContext } from "../contexts";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN_FAILED":
          return {
            ...prevState,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            userToken: action.token,
            isLoggedin: true,
            isLoading: false,
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

      if (token) {
        getUser(token);
      } else {
        dispatch({ type: "SIGN_IN_FAILED" });
      }
    };

    bootstrapAsync();
  }, []);

  function getUser(token) {
    Auth.Profile()
      .then(({ data }) => {
        if (data.headers.error.toString() === "0") {
          setUser(data.body);
          dispatch({ type: "SIGN_IN", token });
        } else {
          dispatch({ type: "SIGN_IN_FAILED" });
        }
      })
      .catch((e) => {
        console.error(e);

        dispatch({ type: "SIGN_IN_FAILED" });
      });
  }

  const authContext = useMemo(
    () => ({
      token: state.userToken,
      isLoading: state.isLoading,
      user,
      signin: async (data) => {
        let token = null;
        Auth.Login(data)
          .then(({ data }) => {
            if (data.headers.error.toString() === "0") {
              let { token: userToken } = data.body;

              localStorage.setItem("token", userToken);
              token = userToken;

              if (token) {
                getUser(token);
              }
            } else {
              dispatch({ type: "SIGN_IN_FAILED" });
            }
          })
          .catch((e) => console.error(e));
      },
      signOut: async () => {
        dispatch({ type: "SIGN_OUT" });
        setUser(null);
        localStorage.removeItem("token");
      },
      register: async (data) => {
        let token = null;
        Auth.Register(data)
          .then(({ data }) => {
            if (data.headers.error.toString() === "0") {
              let { token: userToken } = data.body;
              localStorage.setItem("token", userToken);
              token = userToken;
              if (token) {
                getUser(token);
              }
            }
          })
          .catch((e) => console.error(e));
      },
    }),
    [state, user]
  );

  // useEffect(() => {
  //   console.log(state, authContext);
  // }, [state]);

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
