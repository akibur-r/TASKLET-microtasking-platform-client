import LogoImage from "@/assets/vectors/tasklet.svg";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router";

export function DashboardLogo() {
  const { open } = useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="bg-sidebar-primary/20 dark:bg-sidebar-primary/20 dark:hover:bg-sidebar-primary"
              asChild
            >
              <Link to={"/"} className="flex gap-1 items-center">
                <div className="bg-sidebar-primary/30 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg ">
                  <Avatar asChild className="p-0.5">
                    <AvatarImage src={LogoImage} />
                  </Avatar>
                </div>
                <div className="grid flex-1 text-left text-base font-semibold">
                  Tasklet
                </div>
              </Link>
            </SidebarMenuButton>
          </TooltipTrigger>
          <TooltipContent side="right" className={`${open && "hidden"}`}>
            <p>Back to Homepage</p>
          </TooltipContent>
        </Tooltip>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
