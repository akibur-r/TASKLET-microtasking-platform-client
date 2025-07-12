import Home from "@/components/auth/Index/Home";
import Login from "@/components/auth/Login/Login";
import Register from "@/components/auth/Register/Register";
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
      {
        path: "/dashboard",
        element: (
          <PrivateRouteProvider>
            <DashboardLayout />
          </PrivateRouteProvider>
        ),
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
]);
