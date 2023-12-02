import "./Auth.css";

import { Link } from "react-router-dom";
import { useState, useEffect, FormEvent } from "react";

//Redux
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../../slices/authSlice";
import { Message } from "../../components/Message/Message";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const { loading, error } = useSelector((state: any) => state.auth);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    console.log(user);
    dispatch(register(user));
  };

  //Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="register">
      <h2>ReactGram</h2>
      <p className="subtitle">Sign up to see the photos of your friends.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {!loading && <input type="submit" value="Sign up" />}
        {loading && <input type="submit" value="Loading..." disabled />}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        Do you already have an account? <Link to="/login">Click here</Link>
      </p>
    </div>
  );
};

export default Register;
