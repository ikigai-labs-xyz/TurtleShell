import "./App.css";
import React from "react";
import LandingPage from "./LandingPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      element: <Layout />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;