import React from "react";
import Sidebar from "./dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "./dashboard/Header";
import { Navigate } from "react-router-dom";
import { useAccount } from "wagmi";

const Dashboard = () => {
  

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

export default Dashboard;