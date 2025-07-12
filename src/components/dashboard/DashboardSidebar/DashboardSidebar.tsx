import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { dashboardMenuItems } from "@/utils/dashboardMenuItems";
import { DashboardLogo } from "../DashboardLogo/DashboardLogo";
import { DashboardMenu } from "../DashboardMenu/DashboardMenu";
import { DashboardUserMenu } from "../DashboardUserMenu/DashboardUserMenu";

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <DashboardLogo />
      </SidebarHeader>
      <SidebarContent>
        <DashboardMenu items={dashboardMenuItems.admin} />
      </SidebarContent>
      <SidebarFooter>
        <DashboardUserMenu />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
