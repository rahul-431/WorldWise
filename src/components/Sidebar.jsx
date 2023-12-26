// import React from 'react'
import { NavLink, Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Footer from "./Footer";
import Logo from "./Logo";
import style from "./Sidebar.module.css";
export default function Sidebar() {
  return (
    <div className={style.sidebar}>
      <NavLink to="/">
        <Logo />
      </NavLink>
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}
