import React, { useState, useEffect } from "react";
import { Button, Input } from "../../components";
import { useAuth } from "../../hooks";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = ({ title }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let auth = useAuth();

  let location = useLocation();
  let navigate = useNavigate();

  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    title("Login");
    if (auth.token) {
      navigate(from, { replace: true });
    }
  }, [title, auth.token, navigate, from]);

  function handleSubmit(ev) {
    ev.preventDefault();

    auth.signin({ email, password });
  }

  return (
    <div className="">
      <div className="max-w-md md:max-w-xl w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="shadow-lg rounded-md">
          <dl className="p-5 border-b">
            <dt className="font-semibold text-xl">Login Form</dt>
            <dd>Connect with your friends and family!</dd>
          </dl>
          <form className="p-5" onSubmit={handleSubmit}>
            <Input
              id="email"
              type="email"
              name="email"
              label="Email"
              className="flex-1"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              id="password"
              type="password"
              name="password"
              label="Password"
              className="flex-1"
              parentClass="mt-2"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="text-right text-sm mt-2">
              <Link className="text-blue-400" to="/register">
                Forgot Password?
              </Link>
            </p>
            <Button className="bg-green-500 ml-auto block mt-2 text-white">
              Login
            </Button>
            <p className="text-center">
              Not registered yet?{" "}
              <Link className="text-blue-400" to="/register">
                Register Now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
