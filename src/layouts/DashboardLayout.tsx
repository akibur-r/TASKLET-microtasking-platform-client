import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar/DashboardSidebar";
import Footer from "@/components/root/Footer/Footer";
import CoinBalanceBadge from "@/components/shared/CoinBalanceBadge/CoinBalanceBadge";
import Logo from "@/components/shared/Logo/Logo";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Bell } from "lucide-react";
import { Outlet } from "react-router";
import { Toaster } from "sonner";

export default function DashboardLayout() {
  return (
    <>
      <div className="md:hidden h-14 flex justify-center mt-2">
        <Logo showText />
      </div>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset className="relative ">
          <div className="min-h-screen flex flex-col">
            <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-10 sticky top-0 z-30 bg-background py-7 border-b">
              <div className="w-full flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <div className="w-full  flex flex-wrap gap-2 items-center justify-between">
                  <span>Dashboard</span>
                  <span className="flex justify-end items-center gap-2">
                    <CoinBalanceBadge />
                    {/* TODO */}
                    <span className="px-2 py-1.5 rounded-full bg-primary/30 border border-primary/60">
                      <Bell className="h-4 w-4" />
                    </span>
                  </span>
                </div>
              </div>
            </header>
            <div className="flex-1 p-4">
              <Outlet />
            </div>
          </div>

          <div className="w-full">
            <Footer />
          </div>
        </SidebarInset>
      </SidebarProvider>

      <Toaster position="top-right" richColors />
    </>
  );
}
