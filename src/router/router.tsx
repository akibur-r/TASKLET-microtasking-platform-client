import Home from "@/components/auth/Index/Home";
import Login from "@/components/auth/Login/Login";
import Register from "@/components/auth/Register/Register";
import ManageTasks from "@/components/dashboard/admin/ManageTasks/ManageTasks";
import ManageUsers from "@/components/dashboard/admin/ManageUsers/ManageUsers";
import AddTask from "@/components/dashboard/buyer/AddTask/AddTask";
import MyTasks from "@/components/dashboard/buyer/MyTasks/MyTasks";
import PaymentHistory from "@/components/dashboard/buyer/PaymentHistory/PaymentHistory";
import PurchaseCoins from "@/components/dashboard/buyer/PurchaseCoins/PurchaseCoins";
import DashboardOverview from "@/components/dashboard/DashboardOverview/DashboardOverview";
import TaskDetails from "@/components/dashboard/task/TaskDetails/TaskDetails";
import AvailableTasks from "@/components/dashboard/worker/AvailableTasks/AvailableTasks";
import MySubmissions from "@/components/dashboard/worker/MySubmissions/MySubmissions";
import ErrorElement from "@/components/shared/ErrorElement/ErrorElement";
import Unauthorized from "@/components/shared/Unauthorized/Unauthorized";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import RootLayout from "@/layouts/RootLayout";
import HomePage from "@/pages/HomePage/HomePage";
import PrivateRouteProvider from "@/providers/PrivateRouteProvider/PrivateRouteProvider";
import RoleBasedRouteProvider from "@/providers/RoleBasedRouteProvider/RoleBasedRouteProvider";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  // root
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        Component: HomePage,
      },
    ],
  },
  // auth
  {
    path: "/auth",
    Component: AuthLayout,
    errorElement: <ErrorElement />,
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
  // dashboard
  {
    path: "/dashboard",
    errorElement: <ErrorElement />,
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
      // admin --
      {
        path: "/dashboard/manage-users",
        element: (
          <RoleBasedRouteProvider allowedRoles={["admin"]}>
            <ManageUsers />
          </RoleBasedRouteProvider>
        ),
      },
      {
        path: "/dashboard/manage-tasks",
        element: (
          <RoleBasedRouteProvider allowedRoles={["admin"]}>
            <ManageTasks />
          </RoleBasedRouteProvider>
        ),
      },
      // buyer --
      {
        path: "/dashboard/add-task",
        element: (
          <RoleBasedRouteProvider allowedRoles={["buyer"]}>
            <AddTask />
          </RoleBasedRouteProvider>
        ),
      },
      {
        path: "/dashboard/my-tasks",
        element: (
          <RoleBasedRouteProvider allowedRoles={["buyer"]}>
            <MyTasks />
          </RoleBasedRouteProvider>
        ),
      },
      {
        path: "/dashboard/purchase-coins",
        element: (
          <RoleBasedRouteProvider allowedRoles={["buyer"]}>
            <PurchaseCoins />
          </RoleBasedRouteProvider>
        ),
      },
      {
        path: "/dashboard/payment-history",
        element: (
          <RoleBasedRouteProvider allowedRoles={["buyer"]}>
            <PaymentHistory />
          </RoleBasedRouteProvider>
        ),
      },
      // worker --
      {
        path: "/dashboard/available-tasks",
        element: (
          <RoleBasedRouteProvider allowedRoles={["worker"]}>
            <AvailableTasks />
          </RoleBasedRouteProvider>
        ),
      },
      {
        path: "/dashboard/my-submissions",
        element: (
          <RoleBasedRouteProvider allowedRoles={["worker"]}>
            <MySubmissions />
          </RoleBasedRouteProvider>
        ),
      },
      // shared --
      {
        path: "/dashboard/task/details/:taskId",
        element: (
          <RoleBasedRouteProvider allowedRoles={["admin", "buyer", "worker"]}>
            <TaskDetails />
          </RoleBasedRouteProvider>
        ),
      },
    ],
  },
  {
    path: "/unauthorized",
    Component: Unauthorized,
  },
]);
