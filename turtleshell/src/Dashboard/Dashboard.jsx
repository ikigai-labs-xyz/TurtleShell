import React from 'react'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Sidebar from "./Sidebar";

function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 m-5">
        <div className="text-lg wallet-btn">
            <ConnectButton />
        </div>
      </div>
    </div>
  )
}

export default Dashboard