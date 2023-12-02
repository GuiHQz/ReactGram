import "./Auth.css";

import { Link } from "react-router-dom";
import { Message } from "../../components/Message/Message";

//Hooks
import { useEffect, useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

//Redux
import { login, reset } from "../../slices/authSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";

const Login = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const { loading, error } = useSelector((state: any) => state.auth);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    console.log(user)
    dispatch(login(user));
  };

  //Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="login">
      <h2>ReactGram</h2>
      <p className="subtitle">Sign in to see what's new</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {!loading && <input type="submit" value="Sign In" />}
        {loading && <input type="submit" value="Loading..." disabled/>}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        Do you not have an account? <Link to="/register">Click here</Link>
      </p>
    </div>
  );
};

export default Login;
