import { useState } from "react";
import { Button, Input } from "../../components";
import { useAuth } from "../../hooks";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let auth = useAuth();
  let location = useLocation();
  let navigate = useNavigate();

  let from = location.state?.from?.pathname || "/";

  function handleSubmit(ev) {
    ev.preventDefault();

    auth.signin({ email, password }, () => {
      navigate(from, { replace: true });
    });
  }

  return (
    <div>
      <p>Login</p>
      <form onSubmit={handleSubmit}>
        <Input
          id="email"
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          id="password"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button>Login</Button>
      </form>
    </div>
  );
};

export default Login;
