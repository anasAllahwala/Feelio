import { useState } from "react";
import { Button, Input } from "../../components";
import { useAuth } from "../../hooks";
import { useLocation, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let auth = useAuth();
  let location = useLocation();
  let navigate = useNavigate();

  let from = location.state?.from?.pathname || "/";

  function handleSubmit(ev) {
    ev.preventDefault();

    auth.register({ name, email, password }, () => {
      navigate(from, { replace: true });
    });
  }

  return (
    <div>
      <p>Register</p>
      <form onSubmit={handleSubmit}>
        <Input
          id="fullname"
          type="text"
          name="fullname"
          label="Full Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          id="email"
          type="email"
          name="email"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          id="password"
          type="password"
          name="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button>Register</Button>
      </form>
    </div>
  );
};

export default Register;
