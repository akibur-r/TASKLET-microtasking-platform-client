import Home from "@/components/auth/Index/Home";
import Login from "@/components/auth/Login/Login";
import Register from "@/components/auth/Register/Register";
import DashboardOverview from "@/components/dashboard/DashboardOverview/DashboardOverview";
import ManageUsers from "@/components/dashboard/ManageUsers/ManageUsers";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import RootLayout from "@/layouts/RootLayout";
import HomePage from "@/pages/HomePage/HomePage";
import PrivateRouteProvider from "@/providers/PrivateRouteProvider/PrivateRouteProvider";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouteProvider>
        <DashboardLayout />
      </PrivateRouteProvider>
    ),
    children: [
      {
        index: true,
        Component: DashboardOverview,
      },
      {
        path: "/dashboard/manage-users",
        Component: ManageUsers,
      },
    ],
  },
]);
