import "./Navbar.css";

//components
import { NavLink, Link } from "react-router-dom";
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
} from "react-icons/bs";

//Hooks
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Redux
import { ThunkDispatch } from "@reduxjs/toolkit";
import { logout, reset } from "../../slices/authSlice";

export const Navbar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state: any) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };

  return (
    <nav id="nav">
      <Link to="/">ReactGram</Link>
      <form id="search-form">
        <BsSearch />
        <input type="text" placeholder="Search" />
      </form>
      <ul id="nav-links">
        {auth ? (
          <>
            <li>
              <NavLink to="/">
                <BsHouseDoorFill />
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to={`/users/${user._id}`}>
                  <BsFillCameraFill />
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/profile">
                <BsFillPersonFill />
              </NavLink>
            </li>
            <li>
              <span onClick={handleLogout}>Sair</span>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Sign in</NavLink>
            </li>
            <li>
              <NavLink to="/register">Sign up</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
