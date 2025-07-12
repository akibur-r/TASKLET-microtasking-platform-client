import * as React from "react";

import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useDBUser } from "@/hooks/useDBUser/useDBUser";
import type { dbUserType } from "@/types/dbUserType/dbUserType";
import { dashboardMenuItems } from "@/utils/dashboardMenuItems";
import { DashboardLogo } from "../DashboardLogo/DashboardLogo";
import { DashboardMenu } from "../DashboardMenu/DashboardMenu";
import { DashboardUserMenu } from "../DashboardUserMenu/DashboardUserMenu";

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { dbUser, dbUserLoading } = useDBUser();
  const role: dbUserType["role"] = dbUser?.role ?? "default";
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <DashboardLogo />
      </SidebarHeader>
      <SidebarContent>
        {dbUserLoading ? (
          <LoaderSpinner />
        ) : (
          <DashboardMenu items={dashboardMenuItems[role]} />
        )}
      </SidebarContent>
      <SidebarFooter>
        <DashboardUserMenu />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
