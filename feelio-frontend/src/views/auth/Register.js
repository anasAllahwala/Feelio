import React, { useState, useEffect } from "react";
import { Button, Input } from "../../components";
import { useAuth } from "../../hooks";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Register = ({ title }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let auth = useAuth();
  let location = useLocation();
  let navigate = useNavigate();

  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    title("Register");

    if (auth.user) {
      navigate(from, { replace: true });
    }
  }, [title, from, auth.user, navigate]);

  function handleSubmit(ev) {
    ev.preventDefault();

    auth.register({ name, email, password }, () => {
      navigate(from, { replace: true });
    });
  }

  return (
    <div>
      <div className="max-w-md md:max-w-3xl w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="shadow-lg rounded-md">
          <dl className="p-5 border-b">
            <dt className="font-semibold text-xl">Registration Form</dt>
            <dd>Connect with your friends and family!</dd>
          </dl>
          <form className="p-5" onSubmit={handleSubmit}>
            <Input
              id="fullname"
              type="text"
              name="fullname"
              label="Full Name"
              className="flex-1"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              id="email"
              type="email"
              name="email"
              label="Email"
              className="mt-2 flex-1"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              id="password"
              type="password"
              name="password"
              label="Password"
              className="mt-2 flex-1"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              label="Profile Picture"
              type="file"
              className="mt-2 flex-1"
            />
            <Button className="block ml-auto bg-green-500 text-white mt-2">
              Register
            </Button>
            <p className="text-center">
              Already an user?{" "}
              <Link className="text-blue-400" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
