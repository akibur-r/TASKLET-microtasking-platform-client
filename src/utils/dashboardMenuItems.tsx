import {
  Brackets,
  History,
  House,
  LayoutGrid,
  ListChecks,
  ListTodo,
  Plus,
  Receipt,
  ShoppingBag,
  Ungroup,
  UserCog,
  X,
} from "lucide-react";

export const dashboardMenuItems = {
  worker: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: LayoutGrid,
    },
    {
      title: "Available Tasks",
      url: "/dashboard/available-tasks",
      icon: ListChecks,
    },
    {
      title: "My Submissions",
      url: "/dashboard/my-submissions",
      icon: Brackets,
    },
    {
      title: "Withdrawals",
      url: "/dashboard/withdrawals",
      icon: Receipt,
    },
  ],
  buyer: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: House,
    },
    {
      title: "Add New Task",
      url: "/dashboard/add-task",
      icon: Plus,
    },
    {
      title: "My Tasks",
      url: "/dashboard/my-tasks",
      icon: Ungroup,
    },
    {
      title: "Purchase Coins",
      url: "/dashboard/purchase-coins",
      icon: ShoppingBag,
    },
    {
      title: "Payment History",
      url: "/dashboard/payment-history",
      icon: History,
    },
  ],
  admin: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: House,
    },
    {
      title: "Manage Users",
      url: "/dashboard/manage-users",
      icon: UserCog,
    },
    {
      title: "Manage Tasks",
      url: "/dashboard/manage-tasks",
      icon: ListTodo,
    },
  ],
  default: [
    {
      title: "Invalid Access",
      url: "/dashboard",
      icon: X,
    },
  ],
};
