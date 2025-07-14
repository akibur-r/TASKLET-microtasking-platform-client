import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";

export function DashboardMenu({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  const { toggleSidebar, isMobile } = useSidebar();
  const location = useLocation();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item, idx) => (
          <Link
            key={idx}
            to={item.url}
            onClick={() => {
              if (isMobile) {
                toggleSidebar();
              }
            }}
          >
            <SidebarMenuItem>
              <SidebarMenuButton
                className="cursor-pointer"
                tooltip={item.title}
                isActive={location.pathname === item.url}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
