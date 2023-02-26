import React from "react";
import Sidebar from "../components/navigation/sidebar";
import { Outlet } from "react-router-dom";
import Header from "../components/navigation/header/Header";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 m-5">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;