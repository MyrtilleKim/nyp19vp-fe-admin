import React, { lazy } from "react";

// project import
import Loadable from "components/Loadable";
import MainLayout from "layout/MainLayout";

// render - dashboard
const Dashboard = Loadable(lazy(() => import("pages/dashboard")));

// render - utilities
const Users = Loadable(lazy(() => import("pages/management/user-mgmt")));
const UserDetail = Loadable(lazy(() => import("pages/profile")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "users",
      element: <Users />,
    },
    { path: "users/:id", element: <UserDetail /> },
  ],
};

export default MainRoutes;
